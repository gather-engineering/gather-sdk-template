import { DataSourceType } from '@/constants/dataSources';
import { ImportState } from '@/dataStores/types/dataImporterState';
import { useEffect } from 'react';
import { useDataImporterState } from './useDataImporterState';

export const useImportStateFromIndexedDB = (
  setImportState: (importState: ImportState) => void,
  dataSourceName: DataSourceType
): void => {
  const state = useDataImporterState(dataSourceName);

  useEffect(() => {
    if (state) setImportState(state.importState);
  }, [state, setImportState]);
};
