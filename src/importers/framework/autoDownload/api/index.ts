import { DataSourceType } from '@/constants/dataSources';
import { GmailMessageContentService } from '../../../gmail/service/gmailMessageContent';
import { GmailSearchService } from '../../../gmail/service/gmailSearch';
import { extractAccessCodeFromHtml, extractButtonLinkFromHtml, getEmailFilters } from '../utils';
import { EmailFilterConditions, UploadFlowEmailButtonsType } from '../types';
import { UPLOAD_FLOW_CONTENT_MAPPING } from '../const';

export class AutoDownloadGmailApi {
  datasourceName!: DataSourceType;
  accessToken: string;

  constructor(datasourceName: DataSourceType, accessToken: string) {
    this.datasourceName = datasourceName;
    this.accessToken = accessToken;
  }

  async checkEmailExist(emailFilterConditions: EmailFilterConditions): Promise<boolean> {
    // Initialize gmail search service and read content service
    const gmailSearchService = new GmailSearchService(this.accessToken);

    const filters = getEmailFilters(emailFilterConditions);
    // Search to get all email ids and contents
    const listEmailIds = await gmailSearchService.searchAllEmailsByType(filters);

    return listEmailIds.length > 0;
  }

  async getButtonLinkBySubject(
    buttonType: UploadFlowEmailButtonsType,
    emailFilterConditions: EmailFilterConditions
  ): Promise<string | undefined> {
    // Initialize gmail search service and read content service
    const gmailSearchService = new GmailSearchService(this.accessToken);
    const gmailReadContentService = new GmailMessageContentService(this.accessToken);
    // Generate filter condition
    const filters = getEmailFilters(emailFilterConditions);
    // Search to get all email ids and contents
    const listEmailIds = await gmailSearchService.searchAllEmailsByType(filters);
    const emailContents = await gmailReadContentService.readListRawMessagesContent(listEmailIds);

    // Get and check the newest email contents
    if (!emailContents?.[0]) return;

    const newestEmail = emailContents[0];

    const emailContentMapping = UPLOAD_FLOW_CONTENT_MAPPING[this.datasourceName];
    // check if datasource is already supported
    if (!emailContentMapping) {
      throw new Error(`Datasource ${this.datasourceName} is not supported for auto download yet`);
    }
    const buttonString = emailContentMapping[buttonType];
    if (!buttonString) {
      throw new Error(
        `Button type ${buttonType} is not supported for auto download ${this.datasourceName} yet`
      );
    }
    return extractButtonLinkFromHtml(newestEmail, buttonString);
  }

  async getDownloadAccessCode(
    emailFilterConditions: EmailFilterConditions
  ): Promise<string | null> {
    // Initialize gmail search service and read content service
    const gmailSearchService = new GmailSearchService(this.accessToken);
    const gmailReadContentService = new GmailMessageContentService(this.accessToken);
    // Generate filter condition
    const filters = getEmailFilters(emailFilterConditions);
    // Search to get all email ids and contents
    const listEmailIds = await gmailSearchService.searchAllEmailsByType(filters);
    const emailContents = await gmailReadContentService.readListRawMessagesContent(listEmailIds);

    // Get and check the newest email contents
    if (!emailContents?.[0]) return null;

    const newestEmail = emailContents[0];

    const emailContentMapping = UPLOAD_FLOW_CONTENT_MAPPING[this.datasourceName];
    // check if datasource is already supported
    if (!emailContentMapping) {
      throw new Error(`Datasource ${this.datasourceName} is not supported for auto download yet`);
    }
    const accessCodeString = emailContentMapping.emailDownloadAccessCodeSubject;
    if (!accessCodeString) {
      throw new Error(
        `Access code string is not defined for auto download ${this.datasourceName} yet`
      );
    }

    return extractAccessCodeFromHtml(newestEmail, accessCodeString);
  }
}
