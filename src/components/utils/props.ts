import { DataSourceType } from '@/constants/dataSources';
import { CSSProperties } from 'react';
import { Interpolation } from 'styled-components';

export interface OnConsentCompletedCallbackHandler {
  (dataSource: DataSourceType, allowContinue: boolean): void;
}

export interface OnAuthorizationConsentHandler {
  (dataSource: DataSourceType, onConsentCompletedCallback: OnConsentCompletedCallbackHandler): void;
}

export type UserInfo = chrome.identity.UserInfo;
export interface LoggingContext {
  userInfo?: UserInfo;
  trackDownloadButtonClick?: () => void;
  trackConfirmPopupClick?: () => void;
}

export enum ImporterUIModeEnum {
  BUTTON_ONLY = 'button_only',
  FULL = 'full',
}

export type ImporterUIMode = `${ImporterUIModeEnum}`;

export interface ImporterComponentProps {
  title: string;
  categories: string[];
  styles?: Interpolation<CSSProperties>;
  onAuthorizationConsent?: OnAuthorizationConsentHandler;
  loggingContext?: LoggingContext;
  disableConsent?: boolean;
  uiMode?: ImporterUIMode;
}
