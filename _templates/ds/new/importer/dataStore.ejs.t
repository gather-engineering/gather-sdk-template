---
to: src/importers/<%= h.changeCase.camelCase(name) %>/dataStore/index.ts
---

import Dexie from 'dexie';

import { <%= h.changeCase.pascalCase(name) %>TableNames } from '../constants';

const DB_VERSION = 1;
const DB_NAME = '<%= h.changeCase.snakeCase(name) %>';

export class <%= h.changeCase.pascalCase(name) %>DataStore extends Dexie {
  /* TODO: Add table definitions here */

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION)
      /* TODO: Add table definitions here */
      .stores({})
      .upgrade((_transaction) => {});
  }
}

const <%= h.changeCase.camelCase(name) %>DataStore = new <%= h.changeCase.pascalCase(name) %>DataStore();

export { <%= h.changeCase.camelCase(name) %>DataStore };
