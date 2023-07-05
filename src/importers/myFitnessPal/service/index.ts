import { DataImporterError } from '@/types/customErrors/DataImporterError';
import {
  MY_FITNESS_PAL_DOMAIN,
  MY_FITNESS_PAL_LOGIN_URL,
  MY_FITNESS_PAL_REQUEST_TOKEN,
} from '@/importers/myFitnessPal/constants';

export class MyFitnessPalImporterService {
  constructor() {}

  static async startAuthentication(): Promise<void> {
    chrome.tabs.create({ url: MY_FITNESS_PAL_LOGIN_URL, active: true }, function (newTab) {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        MyFitnessPalImporterService.getRequestToken(tabId);
      });
    });
  }

  static async getRequestToken(tabId: number) {
    chrome.webRequest.onBeforeRequest.addListener(
      function listener(details) {
        if (details.tabId === tabId) {
          const { url } = details;
          const match = url.match(/\/_next\/data\/([^/]+)/);
          const value = match ? match[1] : null;
          if (value) {
            sessionStorage.setItem(MY_FITNESS_PAL_REQUEST_TOKEN, value);
            chrome.webRequest.onBeforeRequest.removeListener(listener);
          }
        }
      },
      { urls: [MY_FITNESS_PAL_DOMAIN] }
    );
  }

  async importData(): Promise<void> {
    try {
      /* TODO: Start import data */
      throw new Error('Not implemented');
    } catch (error) {
      if (error instanceof Error) {
        throw new DataImporterError(error, 'myFitnessPalImporterService.importData');
      }
      throw error;
    }
  }

  async hasData(): Promise<boolean> {
    return false;
  }

  /* TODO: Add other methods here */
}
