import { MY_FITNESS_PAL_URL, MyFitnessPalTableNames } from '@/importers/myFitnessPal/constants';
import { getRequestTokenFromURL } from '@/importers/myFitnessPal/utils/getRequestToken';
import { MyFitnessGoalsResponse } from '@/importers/myFitnessPal/types/myFitnessGoalsResponse';
import { myFitnessPalDataStore } from '@/importers/myFitnessPal/dataStore';
import DOMParser from 'dom-parser';
import compact from 'lodash/compact';

export class MyFitnessPalImporterService {
  constructor() {}

  /**
   * Check if the user is logged in to MyFitnessPal
   * @returns {Promise<string | undefined>} requestToken if the user is logged in, undefined otherwise
   */
  static async silentCheckAuthentication(): Promise<string | undefined> {
    const isAuth = await fetch(MY_FITNESS_PAL_URL.SESSION_URL, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'manual',
    }).then((rs) => rs.ok);
    if (!isAuth) return;

    const html = await fetch(MY_FITNESS_PAL_URL.HOME_PAGE_URL, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'follow',
    }).then(async (rs) => await rs.text());
    const dom = new DOMParser().parseFromString(html);
    const scripts = dom.getElementsByTagName('script') || [];

    for (const script of scripts) {
      const requestToken = getRequestTokenFromURL(script.outerHTML);
      if (requestToken) return requestToken;
    }
  }

  static async importGoals(requestToken: string) {
    const url = `${MY_FITNESS_PAL_URL.BASE_URL}/${requestToken}/${MY_FITNESS_PAL_URL.GOALS_URL}`;
    const response = await fetch(url, {
      method: 'GET',
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
}
