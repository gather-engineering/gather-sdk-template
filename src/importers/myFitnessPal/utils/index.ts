import { myFitnessPalDataStore } from '@/importers/myFitnessPal/dataStore';
import { MyFitnessPalTableNames } from '@/importers/myFitnessPal/constants';

export const isHavingData = (): Promise<boolean> => {
  return Promise.all([
    myFitnessPalDataStore[MyFitnessPalTableNames.DAILY_GOALS].count(),
    myFitnessPalDataStore[MyFitnessPalTableNames.DEFAULT_GOALS].count(),
    myFitnessPalDataStore[MyFitnessPalTableNames.PROFILE].count(),
    myFitnessPalDataStore[MyFitnessPalTableNames.NEWS_FEED].count(),
    myFitnessPalDataStore[MyFitnessPalTableNames.REPORTS].count(),
  ]).then((results) => results.some(Boolean));
};
