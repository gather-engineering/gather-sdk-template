import { MY_FITNESS_PAL_DOMAIN, MY_FITNESS_PAL_URL } from '@/importers/myFitnessPal/constants';
import { handleScriptingError } from '@/importers/myFitnessPal/utils/handleScriptingError';
import { getRequestTokenFromURL } from '@/importers/myFitnessPal/utils/getRequestToken';

export class MyFitnessPalImporterService {
  constructor() {}

  static async silentCheckAuthentication(): Promise<boolean> {
    const response = await fetch(MY_FITNESS_PAL_URL.SESSION_URL, {
      credentials: 'include',
      mode: 'cors',
      redirect: 'manual',
    });
    return response.ok;
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
    return { finishedCurrentState: true };
  }
}
