---
to: src/components/<%= h.changeCase.camelCase(name) %>Importer/index.tsx
---
import { useEffect, useState } from 'react';
import BaseImporterComponent from '../shared/BaseImporterComponent';
import ErrorBoundary from '../shared/ErrorBoundary';
import { useImportStateFromIndexedDB } from '../shared/hooks/useImportStateFromIndexedDB';
import { ImporterComponentProps } from '../utils/props';
import { useImportStateStore, use<%= h.changeCase.pascalCase(name) %>ImporterStateStore } from './use<%= h.changeCase.pascalCase(name) %>ImporterStateStore';
import <%= h.changeCase.camelCase(name) %>Logo from '@/assets/<%= h.changeCase.camelCase(name) %>Logo.png';
import { DATA_SOURCES } from '@/constants/dataSources';

function <%= h.changeCase.pascalCase(name) %>ImporterComponent({
  title = '<%= h.changeCase.sentenceCase(name) %>',
  ...props
}: ImporterComponentProps) {
  const { 
    startAuthentication, onConsentCompletedCallback, initializeLogger,<% if(dataSourceFlowType == 'upload'){ -%> onRequestEmailAuthentication, startUploadFile<% } -%>} = use<%= h.changeCase.pascalCase(name) %>ImporterStateStore();
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    initializeLogger(props.loggingContext?.userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = () => {
    startAuthentication();
  };

  const onConfirmPopup = () => {
    if (props.loggingContext?.trackConfirmPopupClick) {
      props.loggingContext.trackConfirmPopupClick();
    }

    handleConfirm();
  };

  const downloadButtonClickHandler = (_: React.MouseEvent) => {
    if (props.loggingContext?.trackDownloadButtonClick) {
      props.loggingContext.trackDownloadButtonClick();
    }

    if (props.onAuthorizationConsent) {
      props.onAuthorizationConsent(DATA_SOURCES.<%= h.changeCase.constantCase(name) %>, onConsentCompletedCallback);
      return;
    }
    if (props.disableConsent) {
      handleConfirm();
    } else {
      setOpenPopup(true);
    }
  };

  <% if(dataSourceFlowType == 'upload'){ -%>
  const onUploadFileClick = async (_: React.MouseEvent) => {
    // TODO: Check whether need to request permission.
    startUploadFile();
  };  <% } -%>

  const importState = useImportStateStore((store) => store.importState);
  const setImportState = useImportStateStore((store) => store.setImportState);
  useImportStateFromIndexedDB(setImportState, DATA_SOURCES.<%= h.changeCase.constantCase(name) %>);

  return (
    <BaseImporterComponent
      dataSource={DATA_SOURCES.<%= h.changeCase.constantCase(name) %>}
      downloadButtonClickHandler={downloadButtonClickHandler}
      onClosePopup={() => setOpenPopup(false)}
      onConfirmPopup={onConfirmPopup}
      <% if(dataSourceFlowType == 'upload'){ -%>onUploadFileClick={onUploadFileClick}
      onRequestEmailAuthentication={onRequestEmailAuthentication}
      <% } -%>importState={importState}
      logo={<%= h.changeCase.camelCase(name) %>Logo}
      openPopup={openPopup}
      title={title}
      {...props}
    />
  );
}

export default (props: ImporterComponentProps) => {
  return (
    <ErrorBoundary importerName={DATA_SOURCES.<%= h.changeCase.constantCase(name) %>}>
      <<%= h.changeCase.pascalCase(name) %>ImporterComponent {...props} />
    </ErrorBoundary>
  );
};
