import { AMAZON_IMPORT_FLOW_STATES } from '../constants';

export const switchState = {
  [AMAZON_IMPORT_FLOW_STATES.SWITCH]: {
    always: [
      {
        target: `${AMAZON_IMPORT_FLOW_STATES.IMPORT_COMPLETED}`,
        cond: (context: any, _: any) =>
          context.targetState === AMAZON_IMPORT_FLOW_STATES.IMPORT_COMPLETED,
      },
      {
        target: `${AMAZON_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR}`,
        cond: (context: any, _: any) =>
          context.targetState === AMAZON_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR,
      },
      {
        target: `${AMAZON_IMPORT_FLOW_STATES.IMPORT}`,
        cond: (context: any, _: any) => context.targetState === AMAZON_IMPORT_FLOW_STATES.IMPORT,
      },
      /* TODO: Add any specific states here */
    ],
  },
};
