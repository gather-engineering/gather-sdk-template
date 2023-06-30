/// <reference lib="webworker" />

import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { WorkerMessage } from '@/mediators/serviceWorker/types';
import { DataImporter } from '@/importers/framework/dataImporter';
import { swImporters } from '@/mediators/shared/serviceWorkerImporters';

self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  if (event.data.type === PUBSUB_MESSAGES.INITIALIZE) {
    initializeImporter(event.data.dataSource);
    return;
  }

  publishToImporter(event.data.dataSource, event.data);
});

const initializeImporter = (dataSource: string) => {
  const importer: DataImporter = swImporters[dataSource];
  importer.initialize().then(() => {
    console.log(
      `${dataSource} worker initialized, now resume any current state`,
      importer.identifier
    );

    importer.publish(`${PUBSUB_MESSAGES.RESUME}.${dataSource}`, {
      identifier: importer.identifier,
    });
  });
};

const publishToImporter = (dataSource: string, message: WorkerMessage) => {
  const importer: DataImporter = swImporters[dataSource];
  importer.publish(`${message.type}.${dataSource}`, {
    identifier: importer.identifier,
    context: {
      ...message,
    },
  });
};
