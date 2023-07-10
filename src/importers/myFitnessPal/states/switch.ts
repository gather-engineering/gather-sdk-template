import { MY_FITNESS_PAL_IMPORT_FLOW_STATES } from '../constants';

export const switchState = {
  [MY_FITNESS_PAL_IMPORT_FLOW_STATES.SWITCH]: {
    always: [
      {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_COMPLETED}`,
        cond: (context: any, _: any) =>
          context.targetState === MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_COMPLETED,
      },
      {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR}`,
        cond: (context: any, _: any) =>
          context.targetState === MY_FITNESS_PAL_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR,
      },
      {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT}`,
        cond: (context: any, _: any) =>
          context.targetState === MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT,
      },
      {
        target: `${MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_GOALS}`,
        cond: (context: any, _: any) =>
          context.targetState === MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_GOALS,
      },
    ],
  },
};
