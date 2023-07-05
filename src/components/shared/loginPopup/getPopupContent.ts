import { DataSourceType } from "@/constants/dataSources";

export type PopupContent = {
  title: string;
  paragraph: string;
  footer: string;
};

export function getPopupContent(
  dataSourceTitle: string,
  dataSource: DataSourceType
): PopupContent {
  switch (dataSource) {
    default:
      return {
        title: `How to download ${dataSourceTitle} data`,
        paragraph: `To authorize ${dataSourceTitle} with Gather you only need to sign in using the button below.`,
        footer: `Gather will update your data every day.`,
      };
  }
}
