import { BASE_STATES } from '@/importers/sharedXState/baseStates.common';
import { IMPORT_FLOW_STATES } from '@/importers/sharedXState/importFlowStates.common';

export const MY_FITNESS_PAL_DOMAIN = 'https://myfitnesspal.com/*';

export const MY_FITNESS_PAL_URL = {
  BASE_URL: 'https://www.myfitnesspal.com/_next/data',
  HOME_PAGE_URL: 'https://myfitnesspal.com',
  LOGIN_URL: 'https://www.myfitnesspal.com/account/login',
  SESSION_URL: 'https://www.myfitnesspal.com/api/auth/session',
  TIME_LINE: 'https://www.myfitnesspal.com/api/services/activity/timeline',
  REPORT_URL: 'https://www.myfitnesspal.com/reports',
  GOALS_URL: 'en/account/my-goals.json',
};

export const REPORT_DATE = 365;
export const AUTHENTICATION_CHECK_POLLING_MAX_COUNT = 120;

export enum MyFitnessPalTableNames {
  PROFILE = 'profile',
  DAILY_GOALS = 'dailyGoals',
  DEFAULT_GOALS = 'defaultGoals',
  NEWS_FEED = 'newsFeed',
  REPORTS = 'reports',
}

export enum MY_FITNESS_PAL_SPECIFIC_STATES {
  IMPORT_PROFILE = 'importProfile',
  IMPORT_GOALS = 'importGoals',
  IMPORT_NEWSFEED = 'importNewsfeed',
  IMPORT_REPORTS = 'importReports',
}

export const MY_FITNESS_PAL_IMPORT_FLOW_STATES = {
  ...MY_FITNESS_PAL_SPECIFIC_STATES,
  ...IMPORT_FLOW_STATES,
  ...BASE_STATES,
};
