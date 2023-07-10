import Dexie from 'dexie';
import {
  MyFitnessDailyGoal,
  MyFitnessDefaultGoal,
} from '@/importers/myFitnessPal/types/myFitnessGoalsResponse';
import { MyFitnessPalTableNames } from '@/importers/myFitnessPal/constants';
import { MyFitnessNewsFeedData } from '@/importers/myFitnessPal/types/myFitnessNewsFeedResponse';

const DB_VERSION = 1;
const DB_NAME = 'my_fitness_pal';

export class MyFitnessPalDataStore extends Dexie {
  [MyFitnessPalTableNames.DAILY_GOALS]!: Dexie.Table<MyFitnessDailyGoal>;
  [MyFitnessPalTableNames.DEFAULT_GOALS]!: Dexie.Table<MyFitnessDefaultGoal>;
  [MyFitnessPalTableNames.NEWS_FEED]!: Dexie.Table<MyFitnessNewsFeedData>;

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION)
      .stores({
        dailyGoals: '&day_of_week',
        defaultGoals: '&assign_exercise_energy',
        newsFeed: '&id,created_at',
      })
      .upgrade((_transaction) => {});
  }
}

const myFitnessPalDataStore = new MyFitnessPalDataStore();

export { myFitnessPalDataStore };
