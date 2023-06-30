import { PubSubController } from "@/importers/framework/pubSubController";
import { directImporters } from "./directImporters";
import ImporterWorker from "@/mediators/serviceWorker/worker?worker&inline";
import {
  WorkerMessage,
  ImportMediatorType,
} from "@/mediators/serviceWorker/types";
import { PUBSUB_MESSAGES } from "@/importers/framework/pubSubController/types/messages";
import { ScheduleImportConfig } from "@/importers/framework/dataImporter/types/scheduleUnit";
import { ImportState } from "@/dataStores/types/dataImporterState";
import { dataImporterDataStore } from "@/dataStores/dataImporterDataStore";
import { DataSourceType } from "@/constants/dataSources";

export class ImportMediator extends PubSubController {
  private type!: ImportMediatorType;
  private dataSource!: DataSourceType;
  private scheduleImportConfig!: ScheduleImportConfig;
  static importWorker = new ImporterWorker();

  constructor(
    dataSource: DataSourceType,
    type: ImportMediatorType,
    defaultScheduleImportConfig?: ScheduleImportConfig
  ) {
    super();
    Object.assign(this, {
      dataSource,
      type,
      scheduleImportConfig: defaultScheduleImportConfig,
    });
    if (defaultScheduleImportConfig)
      this.setScheduleImport(defaultScheduleImportConfig);

    if (type === ImportMediatorType.ServiceWorker) {
      ImportMediator.importWorker.postMessage({
        type: PUBSUB_MESSAGES.INITIALIZE,
        dataSource,
      });
    } else {
      directImporters[dataSource].initialize().then(() => {
        console.log(
          `${dataSource} non-worker initialized, now resume any current state`,
          directImporters[dataSource].identifier
        );
        directImporters[dataSource].publish(
          `${PUBSUB_MESSAGES.RESUME}.${dataSource}`,
          {
            identifier: directImporters[dataSource].identifier,
          }
        );
      });
    }
  }

  postMessage(message: WorkerMessage) {
    if (this.type === ImportMediatorType.ServiceWorker) {
      ImportMediator.importWorker.postMessage(message);
      return;
    }

    this.publish(`${message.type}.${message.dataSource}`, {
      identifier: directImporters[message.dataSource].identifier,
      context: {
        ...message,
      },
    });
  }

  async setScheduleImport(scheduleImportConfig: ScheduleImportConfig) {
    let importState = await dataImporterDataStore.states.get(this.dataSource);
    if (!importState) {
      scheduleImportConfig.overwrite = true;
      importState = {
        dataSourceName: this.dataSource,
        currentState: "",
        importState: ImportState.DISABLED,
        lastUpdated: new Date(),
        schedule: scheduleImportConfig,
      };
    }

    if (!importState.schedule || scheduleImportConfig.overwrite) {
      importState.schedule = scheduleImportConfig;
      await dataImporterDataStore.states.put(importState);
      this.postMessage({
        type: PUBSUB_MESSAGES.UPDATE_SCHEDULE_IMPORT,
        dataSource: this.dataSource,
      });
    }
  }
}
