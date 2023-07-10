import { myFitnessPalDataStore } from '@/importers/myFitnessPal/dataStore';
import { MyFitnessPalTableNames } from '@/importers/myFitnessPal/constants';

export const isHavingData = (): Promise<boolean> => {
  return Promise.all([
    myFitnessPalDataStore[MyFitnessPalTableNames.DAILY_GOALS].count(),
    myFitnessPalDataStore[MyFitnessPalTableNames.DEFAULT_GOALS].count(),
  ]).then((results) => results.some(Boolean));
};
