---
inject: true
to: <%= `src/mediators/shared/${importMediatorType}Importers.ts` %>
before: '};'
---
  [DATA_SOURCES.<%= h.changeCase.constantCase(name) %>]: <%= h.changeCase.camelCase(name) %>Importer,