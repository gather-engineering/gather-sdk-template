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
import { MyFitnessPalImporterService } from '@/importers/myFitnessPal/service';

export const importReportsState = {
  [MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_REPORTS]: {
    invoke: {
      id: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_REPORTS}`,
      src: async (context: DataImporterContext, _: any) => {
        const { finishedCurrentState } = await MyFitnessPalImporterService.importReports();
        context.finishedCurrentState = finishedCurrentState;
      },
      onDone: {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT}`,
      },
      onError: {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_ERROR}`,
        actions: (context: any, event: any) => {
          context.errorMsg = event.data?.message;
          console.error(event.data);
          errorLogger.captureException(event.data, {
            metricId: MetricIds.DATA_IMPORTER_ERROR,
            feature: DATA_SOURCES.MY_FITNESS_PAL,
            action: event.data?.action || MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_REPORTS,
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