import { UserInfo } from '@/components/utils/props';
import { DATA_SOURCES } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { errorLogger } from '@/importers/framework/errorLogger';
import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { ImportMediator } from '../shared/importMediator';
import { ImportMediatorType } from '../serviceWorker/types';

class AmazonImportMediator extends ImportMediator {
  constructor() {
    super(DATA_SOURCES.AMAZON, ImportMediatorType.Direct , {
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
      dataSource: DATA_SOURCES.AMAZON,
    });
    /* TODO: Add code here to start authentication */
    /* For example, redirect to the authentication page */
    this.postMessage({
      type: PUBSUB_MESSAGES.IMPORT,
      dataSource: DATA_SOURCES.AMAZON,
    });
  }

  async getImporterStates(): Promise<any> {
    return await dataImporterDataStore.getStates(DATA_SOURCES.AMAZON);
  }
    
}

const amazonImportMediator = new AmazonImportMediator();
export { amazonImportMediator };