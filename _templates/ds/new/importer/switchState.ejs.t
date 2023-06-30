---
to: "<%= dataSourceFlowType == 'import' ? `src/importers/${h.changeCase.camelCase(name)}/states/switch.ts` : null %>"
---
import { <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES } from '../constants';

export const switchState = {
  [<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.SWITCH]: {
    always: [
      {
        target: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT_COMPLETED}`,
        cond: (context: any, _: any) =>
          context.targetState === <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT_COMPLETED,
      },
      {
        target: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR}`,
        cond: (context: any, _: any) =>
          context.targetState === <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.AUTHENTICATION_ERROR,
      },
      {
        target: `${<%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT}`,
        cond: (context: any, _: any) => context.targetState === <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES.IMPORT,
      },
      /* TODO: Add any specific states here */
    ],
  },
};
