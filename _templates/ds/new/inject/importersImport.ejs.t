---
inject: true
to: <%= `src/mediators/shared/${importMediatorType}Importers.ts` %>
after: "import { DATA_SOURCES } from '@/constants/dataSources';"
---
import { <%= h.changeCase.camelCase(name) %>Importer } from '@/importers/<%= h.changeCase.camelCase(name) %>';