---
to: "<%= dataSourceFlowType == 'import' ? `src/importers/${h.changeCase.camelCase(name)}/states/import.ts` : null %>"
---
import { <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES } from '../constants';
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
  [<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT]: {
    invoke: {
      id: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT}`,
      src: async (context: DataImporterContext, event: any) => {
        // TODO: import data
      },
      onDone: {
        target: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.SWITCH}`,
      },
      onError: {
        target: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
            action: event.data?.action || <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT,
            error: JSON.stringify(event.data),
            ...context,
          });
        },
      },
    },
    meta: {
      importState: ImportState.IMPORTING,
      authState: AuthState.AUTHENTICATED,
      dataState: DataState.FETCHING,
      dataSourceState: DataSourceState.ENABLED,
    },
  },
};
