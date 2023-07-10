import { MY_FITNESS_PAL_IMPORT_FLOW_STATES } from '../constants';
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
import { identifyTargetState } from '@/importers/myFitnessPal/utils/identifyTargetState';

export const importState = {
  [MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT]: {
    invoke: {
      id: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT}`,
      src: async (context: DataImporterContext, event: any) => {
        const { requestToken, tabId } = event.data;
        context.requestToken = requestToken || context.requestToken;
        context.tabId = tabId || context.tabId;
        if (!context.requestToken) throw Error('Missing requestToken');
        const { targetState, hasData } = await identifyTargetState(context);
        context.targetState = targetState;
        context.hasData = hasData;
      },
      onDone: {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.SWITCH}`,
      },
      onError: {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.MY_FITNESS_PAL,
            action: event.data?.action || MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT,
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
