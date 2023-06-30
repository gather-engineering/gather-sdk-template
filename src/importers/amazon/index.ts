import { StateMachine, createMachine } from 'xstate';
import { DataImporter } from '../framework/dataImporter';
import { v4 as uuid } from 'uuid';
import { DATA_SOURCES } from '@/constants/dataSources';
import { PUBSUB_MESSAGES } from '../framework/pubSubController/types/messages';
import { DataImporterContext } from '../framework/dataImporter/context';
import * as states from './states';
import { commonDelays } from '../sharedXState/delays.common';
import { commonImportFlowStates } from '../sharedXState/importFlowStates.common';
import { commonImporterEvents } from '../sharedXState/events.common';
import { AMAZON_IMPORT_FLOW_STATES } from './constants';

class AmazonImporter extends DataImporter {
  constructor() {
    const identifier = uuid();
    super(DATA_SOURCES.AMAZON, identifier, PUBSUB_MESSAGES.IMPORT);
    this.identifier = identifier;
  }

  async fetchConfiguration(): Promise<boolean> {
    /* TODO: Modify this method to fetch the configuration from the database if needed */
    return true;
  }

  initializeImportMachine(): StateMachine<DataImporterContext, any, any> {
    return createMachine(
      {
        id: 'amazon-importer',
        version: '1',
        predictableActionArguments: true,
        initial: AMAZON_IMPORT_FLOW_STATES.DISABLED,
        context: {
          dataSource: DATA_SOURCES.AMAZON,
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
  }

const amazonImporter = new AmazonImporter();
export { amazonImporter };
