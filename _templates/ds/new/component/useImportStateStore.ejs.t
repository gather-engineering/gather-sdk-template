---
to: src/components/<%= h.changeCase.camelCase(name) %>Importer/use<%= h.changeCase.pascalCase(name) %>ImporterStateStore.ts
---
import { create } from 'zustand';
import { OnConsentCompletedCallbackHandler, UserInfo } from '../utils/props';
import { DATA_SOURCES, DataSourceType } from '@/constants/dataSources';
import { ImportState } from '@/dataStores/types/dataImporterState';
import { <%= h.changeCase.camelCase(name) %>ImportMediator } from '@/mediators/<%= h.changeCase.camelCase(name) %>ImportMediator';

interface ImportStateStore {
  importState: ImportState;
  setImportState: (importState: ImportState) => void;
}

const useImportStateStore = create<ImportStateStore>((set) => ({
  importState: ImportState.DISABLED,
  setImportState: (importState: ImportState) => set({ importState }),
}));

export { useImportStateStore };

interface <%= h.changeCase.pascalCase(name) %>ImporterStateStore {
  startAuthentication: () => void;
  onConsentCompletedCallback: OnConsentCompletedCallbackHandler;
  initializeLogger: (userInfo?: UserInfo) => void;
<% if(dataSourceFlowType == 'upload'){ -%>  onRequestEmailAuthentication: () => void;
  startUploadFile: () => void;
<% } -%>
}

const use<%= h.changeCase.pascalCase(name) %>ImporterStateStore = create<<%= h.changeCase.pascalCase(name) %>ImporterStateStore>((_, get) => ({
  startAuthentication: () => {
    <%= h.changeCase.camelCase(name) %>ImportMediator.startAuthentication();
  },
  onConsentCompletedCallback: (dataSource: DataSourceType, allowContinue: boolean) => {
    if (dataSource === DATA_SOURCES.<%= h.changeCase.constantCase(name) %> && allowContinue) get().startAuthentication();
  },
  initializeLogger: (userInfo?: UserInfo) => {
    <%= h.changeCase.camelCase(name) %>ImportMediator.initializeLogger(userInfo);
  },
<% if(dataSourceFlowType == 'upload'){ -%>  onRequestEmailAuthentication: () => {
    <%= h.changeCase.camelCase(name) %>ImportMediator.startEmailAuthentication();
  },
  startUploadFile: () => {
    <%= h.changeCase.camelCase(name) %>ImportMediator.startUploadFile();
  },
<% } -%>
}));

export { use<%= h.changeCase.pascalCase(name) %>ImporterStateStore };
