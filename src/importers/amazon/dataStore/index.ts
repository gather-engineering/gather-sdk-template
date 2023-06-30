import Dexie from 'dexie';

import { AmazonTableNames } from '../constants';

const DB_VERSION = 1;
const DB_NAME = 'amazon';

export class AmazonDataStore extends Dexie {
  /* TODO: Add table definitions here */

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION)
      /* TODO: Add table definitions here */
      .stores({})
      .upgrade((_transaction) => {});
  }
}

const amazonDataStore = new AmazonDataStore();

export { amazonDataStore };
