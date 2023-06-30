import { AMAZON_IMPORT_FLOW_STATES } from '../constants';
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
  [AMAZON_IMPORT_FLOW_STATES.IMPORT]: {
    invoke: {
      id: `${AMAZON_IMPORT_FLOW_STATES.IMPORT}`,
      src: async (context: DataImporterContext, event: any) => {
        // TODO: import data
      },
      onDone: {
        target: `${AMAZON_IMPORT_FLOW_STATES.SWITCH}`,
      },
      onError: {
        target: `${AMAZON_IMPORT_FLOW_STATES.IMPORT_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.AMAZON,
            action: event.data?.action || AMAZON_IMPORT_FLOW_STATES.IMPORT,
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
