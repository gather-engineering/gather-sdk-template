export enum UPLOAD_FLOW_EMAIL_BUTTONS {
  CONFIRM_BUTTON = 'confirmButton',
  DOWNLOAD_BUTTON = 'downloadButton',
}
export type UploadFlowEmailButtonsType = `${UPLOAD_FLOW_EMAIL_BUTTONS}`;

export interface UploadImportConfigType {
  lastTimeImport: number;
  lastConfirmationEmail?: string | undefined;
  lastDownloadEmail?: string | undefined;
}

export type UploadFlowDataSourceContentType = {
  emailConfirmationSubject?: string;
  emailPreparationSubject?: string;
  emailDownloadSubject: string;
  emailDownloadAccessCodeSubject?: string;
  [UPLOAD_FLOW_EMAIL_BUTTONS.CONFIRM_BUTTON]?: string;
  [UPLOAD_FLOW_EMAIL_BUTTONS.DOWNLOAD_BUTTON]: string;
};

export type EmailFilterConditions = { [key in EmailFilterType]?: string };

export enum EmailFilterType {
  AFTER = 'after',
  BEFORE = 'before',
  CONTENT_HAS_WORDS = 'has',
  CONTENT_NOT_HAVE_WORDS = 'not_have',
  FROM = 'from',
  IN = 'in',
  NEWER_THAN = 'newer_than',
  OLDER_THAN = 'older_than',
  SUBJECT = 'subject',
  TO = 'to',
}
