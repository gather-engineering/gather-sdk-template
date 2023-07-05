import { DataImporterError } from '@/types/customErrors/DataImporterError';
import {
  MY_FITNESS_PAL_DOMAIN,
  MY_FITNESS_PAL_LOGIN_URL,
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
      (details) => {
        if (details.tabId === tabId) {
          console.log('details', details.url);
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
