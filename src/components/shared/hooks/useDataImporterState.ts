import { DataSourceType } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { DataImporterState } from '@/dataStores/types/dataImporterState';
import { useLiveQuery } from 'dexie-react-hooks';

export const useDataImporterState = (
  daSourceName: DataSourceType
): DataImporterState | undefined => {
  const liveStates = useLiveQuery(
    () =>
      dataImporterDataStore.states
        .filter((state) => state.dataSourceName === daSourceName)
        .toArray(),
    [daSourceName]
  );
  return liveStates?.[0];
};
