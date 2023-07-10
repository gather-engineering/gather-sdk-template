import { UserInfo } from '@/components/utils/props';
import { DATA_SOURCES } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { errorLogger } from '@/importers/framework/errorLogger';
import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { ImportMediator } from '../shared/importMediator';
import { ImportMediatorType } from '../serviceWorker/types';
import { MyFitnessPalImporterService } from '@/importers/myFitnessPal/service';
import { AUTHENTICATION_CHECK_POLLING_MAX_COUNT } from '@/importers/myFitnessPal/constants';
import { sleep } from '@/utils/sleep';
import { TIME } from '@/utils/time';

class MyFitnessPalImportMediator extends ImportMediator {
  constructor() {
    super(DATA_SOURCES.MY_FITNESS_PAL, ImportMediatorType.ServiceWorker, {
      /* TODO: update the schedule interval and unit */
      scheduleInterval: 10,
      scheduleUnit: 'minute',
    });
  }

  initializeLogger(userInfo?: UserInfo): void {
    errorLogger.setUserContext(userInfo);
  }

  async startAuthentication(): Promise<void> {
    this.postMessage({
      type: PUBSUB_MESSAGES.START_AUTHENTICATION,
      dataSource: DATA_SOURCES.MY_FITNESS_PAL,
    });

    await this.subscribeToRetrievedEvent();

    const requestToken = await MyFitnessPalImporterService.silentCheckAuthentication();
    console.log('requestToken check ===>', requestToken);
    if (requestToken) {
      return this.postMessage({
        type: PUBSUB_MESSAGES.IMPORT,
        dataSource: DATA_SOURCES.MY_FITNESS_PAL,
        data: {
          requestToken,
        },
      });
    }
    return await MyFitnessPalImporterService.startAuthentication();
  }

  async subscribeToRetrievedEvent(): Promise<void> {
    chrome.runtime.onMessage.addListener(async (message) => {
      const { requestToken, tabId } = message;
      if (message.type === PUBSUB_MESSAGES.TOKEN_RETRIEVED) {
        await this.checkAuthentication(tabId, requestToken);
      }
    });
  }

  async checkAuthentication(tabId: string, requestToken: string): Promise<void> {
    for (let i = 0; i < AUTHENTICATION_CHECK_POLLING_MAX_COUNT; i++) {
      const isAuth = await MyFitnessPalImporterService.silentCheckAuthentication();
      if (isAuth) {
        return this.postMessage({
          type: PUBSUB_MESSAGES.IMPORT,
          dataSource: DATA_SOURCES.MY_FITNESS_PAL,
          data: {
            requestToken,
            tabId,
          },
        });
      }
      await sleep(TIME.SECOND);
    }
    return this.postMessage({
      type: PUBSUB_MESSAGES.AUTHENTICATION_ERROR,
      dataSource: DATA_SOURCES.MY_FITNESS_PAL,
    });
  }

  async getImporterStates(): Promise<any> {
    return await dataImporterDataStore.getStates(DATA_SOURCES.MY_FITNESS_PAL);
  }
}

const myFitnessPalImportMediator = new MyFitnessPalImportMediator();
export { myFitnessPalImportMediator };
