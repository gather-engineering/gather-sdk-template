import { useEffect, useState } from 'react';
import BaseImporterComponent from '../shared/BaseImporterComponent';
import ErrorBoundary from '../shared/ErrorBoundary';
import { useImportStateFromIndexedDB } from '../shared/hooks/useImportStateFromIndexedDB';
import { ImporterComponentProps } from '../utils/props';
import {
  useImportStateStore,
  useMyFitnessPalImporterStateStore,
} from './useMyFitnessPalImporterStateStore';
import myFitnessPalLogo from '@/assets/myFitnessPalLogo.png';
import { DATA_SOURCES } from '@/constants/dataSources';
import { requestChromePermissionsIfNecessary } from '@/utils/requestChromePermissionsIfNecessary';
import { MY_FITNESS_PAL_DOMAIN } from '@/importers/myFitnessPal/constants';

function MyFitnessPalImporterComponent({
  title = 'My fitness pal',
  ...props
}: ImporterComponentProps) {
  const { startAuthentication, onConsentCompletedCallback, initializeLogger } =
    useMyFitnessPalImporterStateStore();
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

  const downloadButtonClickHandler = async (_: React.MouseEvent) => {
    if (props.loggingContext?.trackDownloadButtonClick) {
      props.loggingContext.trackDownloadButtonClick();
    }

    if (props.onAuthorizationConsent) {
      props.onAuthorizationConsent(DATA_SOURCES.MY_FITNESS_PAL, onConsentCompletedCallback);
      return;
    }
    const resp = await requestChromePermissionsIfNecessary({
      permissions: ['scripting', 'background'],
      origins: [MY_FITNESS_PAL_DOMAIN],
    });

    if (resp.ok) {
      if (props.disableConsent) {
        handleConfirm();
      } else {
        setOpenPopup(true);
      }
    }
  };

  const importState = useImportStateStore((store) => store.importState);
  const setImportState = useImportStateStore((store) => store.setImportState);
  useImportStateFromIndexedDB(setImportState, DATA_SOURCES.MY_FITNESS_PAL);

  return (
    <BaseImporterComponent
      dataSource={DATA_SOURCES.MY_FITNESS_PAL}
      downloadButtonClickHandler={downloadButtonClickHandler}
      onClosePopup={() => setOpenPopup(false)}
      onConfirmPopup={onConfirmPopup}
      importState={importState}
      logo={myFitnessPalLogo}
      openPopup={openPopup}
      title={title}
      {...props}
    />
  );
}

export default (props: ImporterComponentProps) => {
  return (
    <ErrorBoundary importerName={DATA_SOURCES.MY_FITNESS_PAL}>
      <MyFitnessPalImporterComponent {...props} />
    </ErrorBoundary>
  );
};
