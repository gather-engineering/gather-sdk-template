import { create } from 'zustand';
import { OnConsentCompletedCallbackHandler, UserInfo } from '../utils/props';
import { DATA_SOURCES, DataSourceType } from '@/constants/dataSources';
import { ImportState } from '@/dataStores/types/dataImporterState';
import { amazonImportMediator } from '@/mediators/amazonImportMediator';

interface ImportStateStore {
  importState: ImportState;
  setImportState: (importState: ImportState) => void;
}

const useImportStateStore = create<ImportStateStore>((set) => ({
  importState: ImportState.DISABLED,
  setImportState: (importState: ImportState) => set({ importState }),
}));

export { useImportStateStore };

interface AmazonImporterStateStore {
  startAuthentication: () => void;
  onConsentCompletedCallback: OnConsentCompletedCallbackHandler;
  initializeLogger: (userInfo?: UserInfo) => void;
}

const useAmazonImporterStateStore = create<AmazonImporterStateStore>((_, get) => ({
  startAuthentication: () => {
    amazonImportMediator.startAuthentication();
  },
  onConsentCompletedCallback: (dataSource: DataSourceType, allowContinue: boolean) => {
    if (dataSource === DATA_SOURCES.AMAZON && allowContinue) get().startAuthentication();
  },
  initializeLogger: (userInfo?: UserInfo) => {
    amazonImportMediator.initializeLogger(userInfo);
  },
}));

export { useAmazonImporterStateStore };
