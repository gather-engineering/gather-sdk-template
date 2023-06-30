import { UserInfo } from '@/components/utils/props';

export type WorkerMessage = {
  type: string;
  dataSource: string;
  access_token?: string;
  user_id?: string;
  scope?: string;
  userInfo?: UserInfo;
  consumerId?: string;
  email?: string;
  refresh_token_info?: string;
  upload_file_link?: string;
};

export enum ImportMediatorType {
  Direct = 'direct',
  ServiceWorker = 'serviceWorker',
}
