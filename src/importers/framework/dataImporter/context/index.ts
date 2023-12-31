import { DATA_SOURCES } from "@/constants/dataSources";

type BaseDataImporterContext = {
  dataSource: DATA_SOURCES;
  hasData: boolean;
  errorMsg?: string;
  scheduledImport?: boolean;
  requestDataRetryCount?: number;
  confirmDataRetryCount?: number;
};

export interface DataImporterContext
  extends BaseDataImporterContext,
    Record<string, any> {}
