import { createMachine, StateMachine } from 'xstate';
import { DataImporter } from '../framework/dataImporter';
import { v4 as uuid } from 'uuid';
import { DATA_SOURCES } from '@/constants/dataSources';
import { PUBSUB_MESSAGES } from '../framework/pubSubController/types/messages';
import { DataImporterContext } from '../framework/dataImporter/context';
import * as states from './states';
import { commonDelays } from '../sharedXState/delays.common';
import { commonImportFlowStates } from '../sharedXState/importFlowStates.common';
import { commonImporterEvents } from '../sharedXState/events.common';
import { MY_FITNESS_PAL_IMPORT_FLOW_STATES } from './constants';

class MyFitnessPalImporter extends DataImporter {
  constructor() {
    const identifier = uuid();
    super(DATA_SOURCES.MY_FITNESS_PAL, identifier, PUBSUB_MESSAGES.IMPORT);
    this.identifier = identifier;
  }

  async fetchConfiguration(): Promise<boolean> {
    /* TODO: Modify this method to fetch the configuration from the database if needed */
    return true;
  }

  initializeImportMachine(): StateMachine<DataImporterContext, any, any> {
    return createMachine(
      {
        id: 'my-fitness-pal-importer',
        version: '1',
        predictableActionArguments: true,
        initial: MY_FITNESS_PAL_IMPORT_FLOW_STATES.DISABLED,
        context: {
          dataSource: DATA_SOURCES.MY_FITNESS_PAL,
          hasData: false,
          pageToken: '',
          targetState: '',
        } as DataImporterContext,
        states: {
          ...commonImportFlowStates,
          ...states.importState,
          ...states.importGoalsState,
          ...states.importNewsFeedState,
          ...states.importProfileState,
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

const myFitnessPalImporter = new MyFitnessPalImporter();
export { myFitnessPalImporter };
