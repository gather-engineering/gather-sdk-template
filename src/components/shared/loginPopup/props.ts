import { DataSourceType } from "@/constants/dataSources";

export type LoginPopupProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  logo: any;
  dataSourceTitle: string;
  dataSource: DataSourceType;
};
