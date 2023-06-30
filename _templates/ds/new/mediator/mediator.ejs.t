---
to: src/mediators/<%= h.changeCase.camelCase(name) %>ImportMediator/index.ts
---

import { UserInfo } from '@/components/utils/props';
import { DATA_SOURCES } from '@/constants/dataSources';
import { dataImporterDataStore } from '@/dataStores/dataImporterDataStore';
import { errorLogger } from '@/importers/framework/errorLogger';
import { PUBSUB_MESSAGES } from '@/importers/framework/pubSubController/types/messages';
import { ImportMediator } from '../shared/importMediator';
import { ImportMediatorType } from '../serviceWorker/types';

class <%= h.changeCase.pascalCase(name) %>ImportMediator extends ImportMediator {
  constructor() {
    super(DATA_SOURCES.<%= h.changeCase.constantCase(name) %>, <% if(importMediatorType == 'direct'){ -%>ImportMediatorType.Direct <% }else{ -%>ImportMediatorType.ServiceWorker<% } -%>, {
      /* TODO: update the schedule interval and unit */
      scheduleInterval: 10,
      scheduleUnit: 'minute',
    });
  }

  initializeLogger(userInfo?: UserInfo): void {
    errorLogger.setUserContext(userInfo);
  }

  async startAuthentication(): Promise<void> {
    this.postMessage({
      type: PUBSUB_MESSAGES.START_AUTHENTICATION,
      dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
    });
    /* TODO: Add code here to start authentication */
    /* For example, redirect to the authentication page */
    this.postMessage({
      type: <% if(dataSourceFlowType == 'upload'){ -%>PUBSUB_MESSAGES.REQUEST_EMAIL_AUTHENTICATION<% } else { -%>PUBSUB_MESSAGES.IMPORT<% } -%>,
      dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
    });
  }

  async getImporterStates(): Promise<any> {
    return await dataImporterDataStore.getStates(DATA_SOURCES.<%= h.changeCase.constantCase(name) %>);
  }
<% if(dataSourceFlowType == 'upload'){ -%>  
  async startEmailAuthentication(): Promise<void> {
    /* TODO: Add code here to request access token */
    this.postMessage({
      type: PUBSUB_MESSAGES.REQUEST_DATA,
      dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
    });
  }

  async startUploadFile(): Promise<void> {
    // TODO: Add code here to hanlde relogin when upload files

    this.subscribeUploadFileUrl();
  }

  async subscribeUploadFileUrl(): Promise<void> {
    const <%= h.changeCase.camelCase(name) %>DownloadLinkListener = (message: any) => {
      if (message && message.type === '<%= h.changeCase.constantCase(name) %>_DOWNLOAD_FILE_MESSAGE') {
        // TODO: close the opened email url tab
        chrome.runtime.onMessage.removeListener(<%= h.changeCase.camelCase(name) %>DownloadLinkListener);
        this.postMessage({
          type: PUBSUB_MESSAGES.UPLOAD,
          dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
          upload_file_link: message.fileUrl as string,
        });
      }
    };

    chrome.runtime.onMessage.addListener(<%= h.changeCase.camelCase(name) %>DownloadLinkListener);
  }<% } -%>    
}

const <%= h.changeCase.camelCase(name) %>ImportMediator = new <%= h.changeCase.pascalCase(name) %>ImportMediator();
export { <%= h.changeCase.camelCase(name) %>ImportMediator };