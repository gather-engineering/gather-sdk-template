---
to: src/importers/<%= h.changeCase.camelCase(name) %>/states/index.ts
---
<% if(dataSourceFlowType == 'import'){ -%>
export * from './import';
export * from './switch';
<% } else { -%>
export * from './upload';
<% } -%>
/* TODO: Add any specific states here */