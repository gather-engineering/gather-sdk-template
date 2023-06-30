import { DataSourceType } from '@/constants/dataSources';
import { AutoDownloadGmailApi } from '../api';
import { DexieWithImportConfigs, ImportConfigs } from './handleImportConfigs';
import { getUploadFlowMappingContent } from '../utils';
import { EmailFilterConditions, EmailFilterType, UPLOAD_FLOW_EMAIL_BUTTONS } from '../types';
import dayjs from 'dayjs';

export class AutoDownloadDataService<T extends DexieWithImportConfigs> {
  autoDownloadGmailApi: AutoDownloadGmailApi;
  datasourceName!: DataSourceType;
  importConfigs!: ImportConfigs<T>;

  constructor(accessToken: string, datasourceName: DataSourceType, dataStore: T) {
    this.autoDownloadGmailApi = new AutoDownloadGmailApi(datasourceName, accessToken);
    this.datasourceName = datasourceName;
    this.importConfigs = new ImportConfigs(dataStore);
  }

  getDefaultEmailFilterConditions(): EmailFilterConditions {
    return {
      after: dayjs().subtract(14, 'day').format('YYYY/MM/DD'),
      from: this.datasourceName,
    } as EmailFilterConditions;
  }

  async getConfirmationLink(
    overrideEmailFilterConditions?: EmailFilterConditions
  ): Promise<string | undefined> {
    const uploadFlowContent = getUploadFlowMappingContent(this.datasourceName);
    if (!uploadFlowContent.emailConfirmationSubject) {
      throw new Error(
        `Email confirmation subject is not defined for this datasource:${this.datasourceName}`
      );
    }

    const emailFilterConditions = this.getDefaultEmailFilterConditions();
    emailFilterConditions[EmailFilterType.SUBJECT] = uploadFlowContent.emailConfirmationSubject;
    if (overrideEmailFilterConditions) {
      for (const key of Object.keys(overrideEmailFilterConditions) as EmailFilterType[]) {
        emailFilterConditions[key] = overrideEmailFilterConditions[key];
      }
    }

    // Get confirm link
    const confirmLink = await this.autoDownloadGmailApi.getButtonLinkBySubject(
      UPLOAD_FLOW_EMAIL_BUTTONS.CONFIRM_BUTTON,
      emailFilterConditions
    );

    // Update import config
    if (confirmLink) {
      await this.importConfigs.updateConfig(
        confirmLink,
        null // lastDownloadEmail
      );
    }

    return confirmLink;
  }

  async getDownloadLink(
    overrideEmailFilterConditions?: EmailFilterConditions
  ): Promise<string | undefined> {
    const uploadFlowContent = getUploadFlowMappingContent(this.datasourceName);

    const emailFilterConditions = this.getDefaultEmailFilterConditions();
    emailFilterConditions[EmailFilterType.SUBJECT] = uploadFlowContent.emailDownloadSubject;
    if (overrideEmailFilterConditions) {
      for (const key of Object.keys(overrideEmailFilterConditions) as EmailFilterType[]) {
        emailFilterConditions[key] = overrideEmailFilterConditions[key];
      }
    }

    // Get download link
    const downloadLink = await this.autoDownloadGmailApi.getButtonLinkBySubject(
      UPLOAD_FLOW_EMAIL_BUTTONS.DOWNLOAD_BUTTON,
      emailFilterConditions
    );

    // Update import config
    if (downloadLink) {
      await this.importConfigs.updateConfig(
        null, // lastConfirmationEmail
        downloadLink
      );
    }

    return downloadLink;
  }

  async getDownloadAccessCode(): Promise<string | null> {
    const uploadFlowContent = getUploadFlowMappingContent(this.datasourceName);

    const emailFilterConditions = this.getDefaultEmailFilterConditions();
    emailFilterConditions[EmailFilterType.SUBJECT] = uploadFlowContent.emailDownloadSubject;
    return await this.autoDownloadGmailApi.getDownloadAccessCode(emailFilterConditions);
  }

  async receivedDataPreparationEmail(): Promise<boolean> {
    const uploadFlowContent = getUploadFlowMappingContent(this.datasourceName);
    if (!uploadFlowContent.emailPreparationSubject) {
      throw new Error(
        `Email preparation subject is not defined for this datasource:${this.datasourceName}`
      );
    }

    const emailFilterConditions = this.getDefaultEmailFilterConditions();
    emailFilterConditions[EmailFilterType.SUBJECT] = uploadFlowContent.emailPreparationSubject;
    return this.autoDownloadGmailApi.checkEmailExist(emailFilterConditions);
  }
}
