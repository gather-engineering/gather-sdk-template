import {
  MY_FITNESS_PAL_DOMAIN,
  MY_FITNESS_PAL_URL,
  MyFitnessPalTableNames,
} from '@/importers/myFitnessPal/constants';
import { handleScriptingError } from '@/importers/myFitnessPal/utils/handleScriptingError';
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

  static async startAuthentication(): Promise<void> {
    chrome.tabs.create({ url: MY_FITNESS_PAL_URL.LOGIN_URL, active: true }, function (newTab) {
      chrome.tabs.onUpdated.addListener(async function listener(tabId, info) {
        if (info.status === 'complete' && tabId === newTab.id) {
          await MyFitnessPalImporterService.getRequestToken(tabId);
        }
      });
    });
  }

  static getRequestToken(tabId: number) {
    chrome.webRequest.onBeforeRequest.addListener(
      function listener(details) {
        const requestToken = getRequestTokenFromURL(details.url);
        if (requestToken) {
          MyFitnessPalImporterService.sendRequestToken(tabId, requestToken);
          chrome.webRequest.onBeforeRequest.removeListener(listener);
        }
      },
      { urls: [MY_FITNESS_PAL_DOMAIN] }
    );
  }

  private static sendRequestToken(tabId: number, requestToken: string) {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: async (args: string[]) => {
          if (!args.length) return console.error('No arguments passed to the script');
          return chrome.runtime.sendMessage({
            type: 'TOKEN_RETRIEVED',
            requestToken: args[0],
            tabId: args[1],
          });
        },
        args: [[requestToken, String(tabId)]],
      },
      (results) => {
        return handleScriptingError(results);
      }
    );
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

    console.log('dailyGoals ==>', dailyGoals);
    console.log('defaultGoals ==>', defaultGoals);

    await myFitnessPalDataStore[MyFitnessPalTableNames.DAILY_GOALS].bulkPut(dailyGoals);
    await myFitnessPalDataStore[MyFitnessPalTableNames.DEFAULT_GOALS].bulkPut(defaultGoals);

    return { finishedCurrentState: true };
  }
}
