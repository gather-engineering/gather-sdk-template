import { DATA_SOURCES, DataSourceType } from '@/constants/dataSources';
import { UploadFlowDataSourceContentType } from '../types';

export const UPLOAD_FLOW_CONTENT_MAPPING: {
  [key in DataSourceType]?: UploadFlowDataSourceContentType;
} = {
  [DATA_SOURCES.LINKEDIN]: {
    emailDownloadSubject: 'your LinkedIn data archive is ready',
    downloadButton: 'your data archive',
  },
  [DATA_SOURCES.SPOTIFY]: {
    // Adding double quote to emailConfirmationSubject and emailDownloadSubject
    // To search emails having the same subject, not containing given subject character
    emailConfirmationSubject: '"Confirm your spotify data request"',
    emailDownloadSubject: '"Your account data is ready to download"',
    confirmButton: 'Confirm',
    downloadButton: 'Download',
  },
  [DATA_SOURCES.TESLA]: {
    emailPreparationSubject: '"Preparing Your Data Request for Download"',
    emailDownloadSubject: '"Your Data is Ready for Download"',
    emailDownloadAccessCodeSubject: 'Access Code',
    downloadButton: 'Download My Data',
  },
  [DATA_SOURCES.NETFLIX]: {
    emailConfirmationSubject: '"Confirm your request"',
    confirmButton: 'Confirm Request',
    emailDownloadSubject: '"Your Netflix data is ready to download"',
    downloadButton: 'Download',
  },
};
