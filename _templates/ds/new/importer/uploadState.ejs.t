---
to: "<%= dataSourceFlowType == 'upload' ? `src/importers/${h.changeCase.camelCase(name)}/states/upload.ts` : null %>"
force: true,
---
import { <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES } from '../constants';
import { errorLogger } from '@/importers/framework/errorLogger';
import { DATA_SOURCES } from '@/constants/dataSources';
import { MetricIds } from '@/constants/logging';
import {
  AuthState,
  DataSourceState,
  DataState,
  ImportState,
} from '@/dataStores/types/dataImporterState';
import { DataImporterContext } from '@/importers/framework/dataImporter/context';

export const importState = {
  [<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_HANDLE_EMAIL_LINK]: {
    invoke: {
      id: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_HANDLE_EMAIL_LINK}`,
      src: async (context: DataImporterContext, event: any) => {
        // TODO: Get file download link from email link
      },
      onDone: {
        target: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_WAIT_FOR_FILE_URL}`,
      },
      onError: {
        target: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
            action: event.data?.action || <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_HANDLE_EMAIL_LINK,
            error: JSON.stringify(event.data),
            ...context,
          });
        },
      },
    },
    meta: {
      importState: ImportState.UPLOADING,
      authState: AuthState.AUTHENTICATED,
      dataState: DataState.FETCHING,
      dataSourceState: DataSourceState.ENABLED,
    },
  },
  [<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD]: {
    invoke: {
      id: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD}`,
      src: async (context: DataImporterContext, event: any) => {
        // TODO: download data and upload to indexedDB
      },
      onDone: {
        target: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_COMPLETED}`,
      },
      onError: {
        target: `${<%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
            action: event.data?.action || <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.UPLOAD,
            error: JSON.stringify(event.data),
            ...context,
          });
        },
      },
    },
  },
};
