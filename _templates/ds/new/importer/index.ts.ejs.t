---
to: src/importers/<%= h.changeCase.camelCase(name) %>/index.ts
---

import { StateMachine, createMachine } from 'xstate';
import { DataImporter } from '../framework/dataImporter';
import { v4 as uuid } from 'uuid';
import { DATA_SOURCES } from '@/constants/dataSources';
import { PUBSUB_MESSAGES } from '../framework/pubSubController/types/messages';
import { DataImporterContext } from '../framework/dataImporter/context';
import * as states from './states';
<% if(dataSourceFlowType == 'import'){ -%>
import { commonDelays } from '../sharedXState/delays.common';
import { commonImportFlowStates } from '../sharedXState/importFlowStates.common';
import { commonImporterEvents } from '../sharedXState/events.common';
import { <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES } from './constants';
<% } else { -%>
import { commonUploaderEvents } from '../sharedXState/events.common';
import { commonUploadFlowStates } from '../sharedXState/uploadFlowStates.common';
import { <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES } from './constants';
<% } -%>

class <%= h.changeCase.pascalCase(name) %>Importer extends DataImporter {
  constructor() {
    const identifier = uuid();
    super(DATA_SOURCES.<%= h.changeCase.constantCase(name) %>, identifier, PUBSUB_MESSAGES.IMPORT);
    this.identifier = identifier;
  }

  async fetchConfiguration(): Promise<boolean> {
    /* TODO: Modify this method to fetch the configuration from the database if needed */
    return true;
  }

  initializeImportMachine(): StateMachine<DataImporterContext, any, any> {
    <% if(dataSourceFlowType == 'import'){ -%>return createMachine(
      {
        id: '<%= h.changeCase.paramCase(name) %>-importer',
        version: '1',
        predictableActionArguments: true,
        initial: <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.DISABLED,
        context: {
          dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
          hasData: false,
          targetState: '',
        } as DataImporterContext,
        states: {
          ...commonImportFlowStates,
          ...states.importState,
          ...states.switchState,
        },
        ...commonImporterEvents,
      },
      {
        ...commonDelays,
      }
    );
  }
  <% } else { -%>return createMachine(
      {
        id: '<%= h.changeCase.paramCase(name) %>-importer',
        version: '1',
        predictableActionArguments: true,
        initial: <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES.DISABLED,
        context: {
          dataSource: DATA_SOURCES.<%= h.changeCase.constantCase(name) %>,
          hasData: false,
          targetState: '',
        } as DataImporterContext,
        states: {
          ...commonUploadFlowStates,
          ...states.uploadState,
        },
        ...commonUploaderEvents,
      });
  }
  <% } -%>
}

const <%= h.changeCase.camelCase(name) %>Importer = new <%= h.changeCase.pascalCase(name) %>Importer();
export { <%= h.changeCase.camelCase(name) %>Importer };
