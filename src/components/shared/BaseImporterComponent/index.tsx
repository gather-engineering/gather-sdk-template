import { Card } from "@/components/shared/card";
import { LogoBox } from "@/components/shared/logoBox";
import { Stack } from "@/components/shared/stack";
import { MainTitle } from "@/components/shared/mainTitle";
import { Tag } from "@/components/shared/tag";
import {
  ImporterComponentProps,
  ImporterUIModeEnum,
} from "@/components/utils/props";
import { ImportState } from "@/dataStores/types/dataImporterState";
import { LoginPopup } from "../loginPopup";
import BaseDownloadButton from "../BaseDownloadButton";
import { DataSourceType } from "@/constants/dataSources";
import { useDataImporterState } from "../hooks/useDataImporterState";
import { OnClickHandler } from "../button/props";
import BaseDownloadInfo from "../BaseDowanloadInfo";

type BaseImporterComponentProps = ImporterComponentProps & {
  openPopup: boolean;
  logo: string;
  importState: ImportState;
  dataSource: DataSourceType;
  onClosePopup: () => void;
  onConfirmPopup: () => void;
  downloadButtonClickHandler: OnClickHandler;
  onRequestEmailAuthentication?: OnClickHandler;
  onUploadFileClick?: OnClickHandler;
};

export default function BaseImporterComponent({
  uiMode = ImporterUIModeEnum.FULL,
  title,
  categories,
  styles,
  disableConsent = false,
  openPopup,
  dataSource,
  logo,
  importState,
  onClosePopup,
  onConfirmPopup,
  downloadButtonClickHandler,
  onRequestEmailAuthentication,
  onUploadFileClick,
}: BaseImporterComponentProps) {
  const dataImporterState = useDataImporterState(dataSource);

  const loginPopup = !disableConsent ? (
    <LoginPopup
      open={openPopup}
      onClose={onClosePopup}
      onConfirm={onConfirmPopup}
      logo={logo}
      dataSource={dataSource}
      dataSourceTitle={title}
    />
  ) : null;

  if (uiMode === ImporterUIModeEnum.BUTTON_ONLY) {
    return (
      <>
        {loginPopup}
        <Stack
          styles={{
            justifyContent: "center",
          }}
        >
          <BaseDownloadButton
            onRequestEmailAuthentication={onRequestEmailAuthentication}
            onClick={downloadButtonClickHandler}
            importState={importState}
            dataState={dataImporterState?.dataState}
            onUploadFileClick={onUploadFileClick}
          />
        </Stack>
      </>
    );
  }

  return (
    <>
      {loginPopup}
      <Card styles={styles}>
        <Stack styles={{ flexDirection: "row" }}>
          <LogoBox logo={logo} />
          <Stack
            styles={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              flexGrow: "1",
            }}
          >
            <Stack
              styles={{
                flexDirection: "row",
                justifyContent: "center",
                paddingLeft: "20px",
              }}
            >
              <MainTitle title={title} />
            </Stack>
            <Stack
              styles={{
                flexDirection: "row",
                justifyContent: "center",
                paddingLeft: "20px",
                marginTop: "5px",
                gap: "10px",
              }}
            >
              {categories?.map((cat, index) => (
                <Tag key={`${cat}_${index}`} tag={cat} />
              ))}
            </Stack>
          </Stack>
          <Stack
            styles={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <BaseDownloadInfo
              dataSourceTitle={title}
              importState={importState}
            />
          </Stack>
          <Stack
            styles={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <BaseDownloadButton
              importState={importState}
              dataState={dataImporterState?.dataState}
              onClick={downloadButtonClickHandler}
              onRequestEmailAuthentication={onRequestEmailAuthentication}
              onUploadFileClick={onUploadFileClick}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
