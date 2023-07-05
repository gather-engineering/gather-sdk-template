import { BASE_STATES } from '@/importers/sharedXState/baseStates.common';
import { IMPORT_FLOW_STATES } from '@/importers/sharedXState/importFlowStates.common';

export const MY_FITNESS_PAL_DOMAIN = 'https://*.myfitnesspal.com/*';
export const MY_FITNESS_PAL_LOGIN_URL = 'https://www.myfitnesspal.com/account/login';

export enum MyFitnessPalTableNames {
  GOALS = 'goals',
}

export enum MY_FITNESS_PAL_SPECIFIC_STATES {
  IMPORT_GOALS = 'importGoals',
}

export const MY_FITNESS_PAL_IMPORT_FLOW_STATES = {
  ...MY_FITNESS_PAL_SPECIFIC_STATES,
  ...IMPORT_FLOW_STATES,
  ...BASE_STATES,
};

export enum MyFitnessPalTableNames {}
/* TODO: Add table names here */
