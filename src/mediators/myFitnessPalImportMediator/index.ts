import { UserInfo } from '@/components/utils/props';
import { DATA_SOURCES } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { errorLogger } from '@/importers/framework/errorLogger';
import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { ImportMediator } from '../shared/importMediator';
import { ImportMediatorType } from '../serviceWorker/types';
import { MyFitnessPalImporterService } from '@/importers/myFitnessPal/service';

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
    await MyFitnessPalImporterService.startAuthentication();

    this.postMessage({
      type: PUBSUB_MESSAGES.IMPORT,
      dataSource: DATA_SOURCES.MY_FITNESS_PAL,
    });
  }

  async getImporterStates(): Promise<any> {
    return await dataImporterDataStore.getStates(DATA_SOURCES.MY_FITNESS_PAL);
  }
}

const myFitnessPalImportMediator = new MyFitnessPalImportMediator();
export { myFitnessPalImportMediator };
