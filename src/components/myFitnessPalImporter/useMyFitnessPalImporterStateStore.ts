import { create } from 'zustand';
import { OnConsentCompletedCallbackHandler, UserInfo } from '../utils/props';
import { DATA_SOURCES, DataSourceType } from '@/constants/dataSources';
import { ImportState } from '@/dataStores/types/dataImporterState';
import { myFitnessPalImportMediator } from '@/mediators/myFitnessPalImportMediator';

interface ImportStateStore {
  importState: ImportState;
  setImportState: (importState: ImportState) => void;
}

const useImportStateStore = create<ImportStateStore>((set) => ({
  importState: ImportState.DISABLED,
  setImportState: (importState: ImportState) => set({ importState }),
}));

export { useImportStateStore };

interface MyFitnessPalImporterStateStore {
  startAuthentication: () => void;
  onConsentCompletedCallback: OnConsentCompletedCallbackHandler;
  initializeLogger: (userInfo?: UserInfo) => void;
}

const useMyFitnessPalImporterStateStore = create<MyFitnessPalImporterStateStore>((_, get) => ({
  startAuthentication: () => {
    myFitnessPalImportMediator.startAuthentication();
  },
  onConsentCompletedCallback: (dataSource: DataSourceType, allowContinue: boolean) => {
    if (dataSource === DATA_SOURCES.MY_FITNESS_PAL && allowContinue) get().startAuthentication();
  },
  initializeLogger: (userInfo?: UserInfo) => {
    myFitnessPalImportMediator.initializeLogger(userInfo);
  },
}));

export { useMyFitnessPalImporterStateStore };
