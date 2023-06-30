---
to: src/importers/<%= h.changeCase.camelCase(name) %>/constants/index.ts
---

import { BASE_STATES } from '@/importers/sharedXState/baseStates.common';
<% if(dataSourceFlowType == 'import'){ -%>
import { IMPORT_FLOW_STATES } from '@/importers/sharedXState/importFlowStates.common';
<% } else { -%>
import { UPLOAD_FLOW_STATES } from '@/importers/sharedXState/uploadFlowStates.common';
<% } -%>

export enum <%= h.changeCase.constantCase(name) %>_SPECIFIC_STATES {}

<% if(dataSourceFlowType == 'import'){ -%>
export const <%= h.changeCase.constantCase(name) %>_IMPORT_FLOW_STATES = {
  ...<%= h.changeCase.constantCase(name) %>_SPECIFIC_STATES,
  ...IMPORT_FLOW_STATES,
  ...BASE_STATES,
};
<% } else { -%>
export const <%= h.changeCase.constantCase(name) %>_UPLOAD_FLOW_STATES = {
  ...<%= h.changeCase.constantCase(name) %>_SPECIFIC_STATES,
  ...UPLOAD_FLOW_STATES,
  ...BASE_STATES,
};
<% } -%>

export enum <%= h.changeCase.pascalCase(name) %>TableNames {
  /* TODO: Add table names here */
}