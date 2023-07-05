import Dexie from 'dexie';

import { MyFitnessPalTableNames } from '../constants';

const DB_VERSION = 1;
const DB_NAME = 'my_fitness_pal';

export class MyFitnessPalDataStore extends Dexie {
  [MyFitnessPalTableNames.GOALS]!: Dexie.Table<any>;
  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION)
      .stores({
        goals: '&id',
      })
      .upgrade((_transaction) => {});
  }
}

const myFitnessPalDataStore = new MyFitnessPalDataStore();

export { myFitnessPalDataStore };
