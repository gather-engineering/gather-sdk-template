import { useEffect, useState } from 'react';
import BaseImporterComponent from '../shared/BaseImporterComponent';
import ErrorBoundary from '../shared/ErrorBoundary';
import { useImportStateFromIndexedDB } from '../shared/hooks/useImportStateFromIndexedDB';
import { ImporterComponentProps } from '../utils/props';
import { useImportStateStore, useAmazonImporterStateStore } from './useAmazonImporterStateStore';
import amazonLogo from '@/assets/amazonLogo.png';
import { DATA_SOURCES } from '@/constants/dataSources';

function AmazonImporterComponent({
  title = 'Amazon',
  ...props
}: ImporterComponentProps) {
  const { 
    startAuthentication, onConsentCompletedCallback, initializeLogger,} = useAmazonImporterStateStore();
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
      props.onAuthorizationConsent(DATA_SOURCES.AMAZON, onConsentCompletedCallback);
      return;
    }
    if (props.disableConsent) {
      handleConfirm();
    } else {
      setOpenPopup(true);
    }
  };

  
  const importState = useImportStateStore((store) => store.importState);
  const setImportState = useImportStateStore((store) => store.setImportState);
  useImportStateFromIndexedDB(setImportState, DATA_SOURCES.AMAZON);

  return (
    <BaseImporterComponent
      dataSource={DATA_SOURCES.AMAZON}
      downloadButtonClickHandler={downloadButtonClickHandler}
      onClosePopup={() => setOpenPopup(false)}
      onConfirmPopup={onConfirmPopup}
      importState={importState}
      logo={amazonLogo}
      openPopup={openPopup}
      title={title}
      {...props}
    />
  );
}

export default (props: ImporterComponentProps) => {
  return (
    <ErrorBoundary importerName={DATA_SOURCES.AMAZON}>
      <AmazonImporterComponent {...props} />
    </ErrorBoundary>
  );
};
