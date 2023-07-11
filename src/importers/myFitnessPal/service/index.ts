import {
  MY_FITNESS_PAL_URL,
  MyFitnessPalTableNames,
  REPORT_DATE,
} from '@/importers/myFitnessPal/constants';
import { getRequestTokenFromURL } from '@/importers/myFitnessPal/utils/getRequestToken';
import { MyFitnessGoalsResponse } from '@/importers/myFitnessPal/types/myFitnessGoalsResponse';
import { myFitnessPalDataStore } from '@/importers/myFitnessPal/dataStore';
import DOMParser from 'dom-parser';
import compact from 'lodash/compact';
import { MyFitnessNewsFeedData } from '@/importers/myFitnessPal/types/myFitnessNewsFeedResponse';
import { getNewsFeedPageToken } from '@/importers/myFitnessPal/utils/getNewsFeedPageToken';
import { MyFitnessProfileResponse } from '@/importers/myFitnessPal/types/myFitnessProfileResponse';
import { MyFitnessReportResponse } from '@/importers/myFitnessPal/types/myFitnessReportResponse';

export class MyFitnessPalImporterService {
  constructor() {}

  /**
   * Check if the user is logged in to MyFitnessPal
   * @returns {Promise<string | undefined>} requestToken if the user is logged in, undefined otherwise
   */
  static async silentCheckAuthentication(): Promise<string | undefined> {
    const response = await fetch(MY_FITNESS_PAL_URL.SESSION_URL, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'manual',
    }).then(async (rs) => (await rs.json()) as MyFitnessProfileResponse);
    if (!response?.userId) return;

    const homePageHtml = await fetch(MY_FITNESS_PAL_URL.HOME_PAGE_URL, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'follow',
    }).then(async (rs) => await rs.text());
    const dom = new DOMParser().parseFromString(homePageHtml);
    const scripts = dom.getElementsByTagName('script') || [];

    for (const script of scripts) {
      const requestToken = getRequestTokenFromURL(script.outerHTML);
      if (requestToken) return requestToken;
    }
  }

  static async importGoals(requestToken: string) {
    const url = `${MY_FITNESS_PAL_URL.BASE_URL}/${requestToken}/${MY_FITNESS_PAL_URL.GOALS_URL}`;
    const response = await fetch(url, {
      credentials: 'include',
      mode: 'cors',
    }).then(async (rs) => (await rs.json()) as MyFitnessGoalsResponse);

    const dailyGoals = compact(
      response?.pageProps?.dehydratedState?.queries?.flatMap(
        (query) => query?.state?.data?.daily_goals
      )
    );

    const defaultGoals = compact(
      response?.pageProps?.dehydratedState?.queries?.map(
        (query) => query?.state?.data?.default_goal
      )
    );

    await myFitnessPalDataStore[MyFitnessPalTableNames.DAILY_GOALS].bulkPut(dailyGoals);
    await myFitnessPalDataStore[MyFitnessPalTableNames.DEFAULT_GOALS].bulkPut(defaultGoals);

    return { finishedCurrentState: true };
  }

  static async importNewsFeed(pageToken: string) {
    const params = new URLSearchParams({ page_token: pageToken });
    const url = `${MY_FITNESS_PAL_URL.TIME_LINE}?${params.toString()}`;
    let finishedCurrentState = true;
    const newsFeedData: MyFitnessNewsFeedData[] = await fetch(url, {
      credentials: 'include',
      mode: 'cors',
    }).then(async (rs) => {
      const response = (await rs.json()) as MyFitnessNewsFeedData[];
      const link = rs.headers.get('link');
      const token = getNewsFeedPageToken(link);
      if (token) {
        finishedCurrentState = false;
        pageToken = token;
      }
      return response;
    });

    await myFitnessPalDataStore[MyFitnessPalTableNames.NEWS_FEED].bulkPut(newsFeedData);

    return { finishedCurrentState, pageToken };
  }

  static async importProfile() {
    const myFitnessProfileResponse = await fetch(MY_FITNESS_PAL_URL.SESSION_URL, {
      credentials: 'include',
      mode: 'cors',
    }).then(async (rs) => (await rs.json()) as MyFitnessProfileResponse);
    await myFitnessPalDataStore[MyFitnessPalTableNames.PROFILE].put(myFitnessProfileResponse);
    return { finishedCurrentState: true };
  }

  static async importReports() {
    const reportPageHtml = await fetch(MY_FITNESS_PAL_URL.REPORT_URL, {
      credentials: 'include',
      mode: 'cors',
    }).then(async (rs) => await rs.text());
    const dom = new DOMParser().parseFromString(reportPageHtml);
    const reportSelector = dom.getElementById('report');
    const optgroupElements = reportSelector?.getElementsByTagName('optgroup');

    const optionGroups = optgroupElements?.map((optgroup) => {
      const optionTags = optgroup.getElementsByTagName('option');
      return {
        type: optgroup.getAttribute('label'),
        options: optionTags?.map((option) => {
          return {
            value: option.getAttribute('value'),
            report: option.textContent.trim(),
          };
        }),
      };
    });

    if (!optionGroups) return { finishedCurrentState: true };

    for (const optionGroup of optionGroups) {
      if (!(optionGroup.options && optionGroup.type)) continue;
      for (const option of optionGroup.options) {
        if (!option.value) continue;
        const reportData = await this.fetchReportData(
          option.report,
          optionGroup.type.toLowerCase(),
          option.value,
          REPORT_DATE
        );
        await myFitnessPalDataStore[MyFitnessPalTableNames.REPORTS].put(reportData);
      }
    }
    return { finishedCurrentState: true };
  }

  /**
   * Fetches the report data from MyFitnessPal
   * @param report The report name
   * @param type The report type (ex. Nutrients, Measurements, etc.)
   * @param value The report value
   * @param date The number of day needed to be reported (ex. 7 days, 365 days, etc.)
   * @private
   * @returns {Promise<MyFitnessReportResponse>} The report data
   */
  private static async fetchReportData(
    report: string,
    type: string,
    value: string,
    date: number
  ): Promise<MyFitnessReportResponse> {
    const url = `${MY_FITNESS_PAL_URL.REPORT_URL}/results/${type}/${value}/${date}.json?report_name=${report}`;
    return await fetch(url, {
      credentials: 'include',
      mode: 'cors',
    }).then(async (rs) => (await rs.json()) as MyFitnessReportResponse);
  }
}
