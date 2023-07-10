import { UserInfo } from '@/components/utils/props';
import { DATA_SOURCES } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { errorLogger } from '@/importers/framework/errorLogger';
import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { ImportMediator } from '../shared/importMediator';
import { ImportMediatorType } from '../serviceWorker/types';
import { MyFitnessPalImporterService } from '@/importers/myFitnessPal/service';
import {
  AUTHENTICATION_CHECK_POLLING_MAX_COUNT,
  MY_FITNESS_PAL_URL,
} from '@/importers/myFitnessPal/constants';
import { sleep } from '@/utils/sleep';
import { TIME } from '@/utils/time';
import { closeTabById, createTab } from '@/components/utils/chromeTabs';

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

    const requestToken = await MyFitnessPalImporterService.silentCheckAuthentication();
    if (!requestToken) return await this.checkAuthentication();

    return this.postMessage({
      type: PUBSUB_MESSAGES.IMPORT,
      dataSource: DATA_SOURCES.MY_FITNESS_PAL,
      requestToken,
    });
  }

  async checkAuthentication(): Promise<void> {
    const tab = await createTab({
      active: true,
      url: MY_FITNESS_PAL_URL.LOGIN_URL,
    });

    if (!tab.id) {
      return this.postMessage({
        type: PUBSUB_MESSAGES.AUTHENTICATION_ERROR,
        dataSource: DATA_SOURCES.MY_FITNESS_PAL,
      });
    }

    for (let i = 0; i < AUTHENTICATION_CHECK_POLLING_MAX_COUNT; i++) {
      const requestToken = await MyFitnessPalImporterService.silentCheckAuthentication();
      if (requestToken) {
        await closeTabById(tab.id);
        return this.postMessage({
          type: PUBSUB_MESSAGES.IMPORT,
          dataSource: DATA_SOURCES.MY_FITNESS_PAL,
          requestToken,
        });
      }
      await sleep(TIME.SECOND);
    }

    await closeTabById(tab.id);
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
