---
inject: true
to: src/constants/dataSources.ts
skip_if: <%= name %>
after: "export enum DATA_SOURCES {"
---
  <%= h.changeCase.constantCase(name) %> = '<%= h.changeCase.snakeCase(name) %>',