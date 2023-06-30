import { DATA_SOURCES, DataSourceType } from '@/constants/dataSources';

export type PopupContent = {
  title: string;
  paragraph: string;
  footer: string;
};

const SPOTIFY_POPUP_CONTENT: PopupContent = {
  title: 'How to download Spotify data',
  paragraph:
    'Hey user! You can get a lot more data out of spotify, including your entire streaming history.',
  footer: 'We’ll guide you through each step of the way. The first step is to log into Spotify.',
};

export function getPopupContent(dataSourceTitle: string, dataSource: DataSourceType): PopupContent {
  switch (dataSource) {
    case DATA_SOURCES.SPOTIFY:
      return SPOTIFY_POPUP_CONTENT;
    default:
      return {
        title: `How to download ${dataSourceTitle} data`,
        paragraph: `To authorize ${dataSourceTitle} with Gather you only need to sign in using the button below.`,
        footer: `Gather will update your data every day.`,
      };
  }
}
