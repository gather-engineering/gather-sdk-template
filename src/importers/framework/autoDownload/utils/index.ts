import { DataSourceType } from '@/constants/dataSources';
import { UPLOAD_FLOW_CONTENT_MAPPING } from '../const';
import { EmailFilterConditions, EmailFilterType, UploadFlowDataSourceContentType } from '../types';

export const getEmailFilters = (emailFilterConditions: EmailFilterConditions): string => {
  const filters = [] as string[];
  for (const key of Object.keys(emailFilterConditions) as EmailFilterType[]) {
    const val = emailFilterConditions[key];
    if (!val) {
      continue;
    }
    switch (key) {
      case EmailFilterType.CONTENT_HAS_WORDS:
        filters.push(val);
        break;
      case EmailFilterType.CONTENT_NOT_HAVE_WORDS:
        filters.push(`-{${val}}`);
        break;
      case EmailFilterType.SUBJECT:
        filters.push(`${key}:(${val})`);
        break;
      default:
        filters.push(`${key}:${val}`);
    }
  }
  return filters.join(' ');
};

export const extractButtonLinkFromHtml = (html: string, buttonText: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  return Array.from(dom.querySelectorAll('a')).find((a) => a.textContent?.includes(buttonText))
    ?.href;
};

export const extractAccessCodeFromHtml = (html: string, accessCodeString: string) => {
  const dom = new DOMParser().parseFromString(html, 'text/html');

  return (
    Array.from(dom.querySelectorAll('p')).find((a) => a.textContent?.includes(accessCodeString))
      ?.textContent || null
  );
};

export const readGmailContentData = (data: any) => {
  if (!Array.isArray(data.payload?.parts)) {
    // Return default value in the body data
    return data.payload.body.data;
  }

  // Find the text/html
  const htmlData = data.payload.parts.find((p: any) => p.mimeType === 'text/html');
  return htmlData?.body?.data || data.payload.body.data;
};

export function getUploadFlowMappingContent(
  dataSource: DataSourceType
): UploadFlowDataSourceContentType {
  const emailContentMapping = UPLOAD_FLOW_CONTENT_MAPPING[dataSource];
  // check if datasource is already supported
  if (!emailContentMapping) {
    throw new Error(`Datasource ${dataSource} is not supported for auto download yet`);
  }

  return emailContentMapping;
}
