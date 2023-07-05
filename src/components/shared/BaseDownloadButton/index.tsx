import { DataState, ImportState } from "@/dataStores/types/dataImporterState";
import React from "react";
import { Button } from "@/components/shared/button";
import { OnClickHandler } from "../button/props";
import {
  faCheck,
  faArrowsRotate,
  faSpinner as faLoader,
  faClock as faHourglassClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faMehBlank as faEmptySet,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

type DownloadButtonProps = {
  dataState: DataState | undefined;
  importState: ImportState | undefined;
  onClick?: OnClickHandler;
  onRequestEmailAuthentication?: OnClickHandler;
  onUploadFileClick?: OnClickHandler;
};

export default function BaseDownloadButton({
  dataState,
  importState,
  onClick,
  onRequestEmailAuthentication,
  onUploadFileClick,
}: DownloadButtonProps): JSX.Element {
  switch (importState) {
    case ImportState.DISABLED:
      return (
        <Button
          label="Download"
          size="large"
          onClick={onClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );

    case ImportState.ENABLED:
    case ImportState.PENDING_AUTH_LOGIN:
    case ImportState.AUTH_STARTED:
      return (
        <Button
          error
          label="Need To Login"
          size="large"
          startIcon={faExclamationCircle}
          onClick={onClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );

    case ImportState.IMPORTING:
    case ImportState.UPLOADING:
      return (
        <Button
          label="Downloading"
          isLoading
          disabled
          size="large"
          startIcon={faLoader}
          startIconColor="#637381"
          onClick={onClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );

    case ImportState.COMPLETED: {
      const hasData = dataState === DataState.DATA_RECEIVED;
      const greenColor = "#36B37E";
      const greyColor = "#919EAB";
      return (
        <Button
          label={hasData ? "Downloaded" : "No Data"}
          size="large"
          disabled
          startIcon={hasData ? faCheck : faEmptySet}
          startIconColor={hasData ? greenColor : greyColor}
          onClick={onClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );
    }

    case ImportState.REQUEST_EMAIL_AUTHENTICATION:
      return (
        <Button
          label="Connect your Gmail"
          size="large"
          onClick={onRequestEmailAuthentication}
          styles={{ width: "155px", padding: "8px" }}
        />
      );
    case ImportState.PENDING_UPLOAD:
      return (
        <Button
          label="Request Sent"
          size="large"
          disabled
          startIcon={faHourglassClock}
          styles={{ width: "155px", padding: "8px" }}
        />
      );
    case ImportState.UPLOAD_FILE_READY:
      return (
        <Button
          label="Download Data"
          size="large"
          onClick={onUploadFileClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );

    case ImportState.CRITICAL_ERROR:
      return (
        <Button
          error
          label="Retry"
          size="large"
          startIcon={faArrowsRotate}
          onClick={onClick}
          styles={{ width: "155px", padding: "8px" }}
        />
      );

    default:
      return <React.Fragment />;
  }
}
