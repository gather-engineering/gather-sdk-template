export interface MyFitnessGoalsResponse {
  pageProps: PageProps;
}

export interface PageProps {
  dehydratedState: DehydratedState;
}

export interface DehydratedState {
  mutations: any[];
  queries: Query[];
}

export interface Query {
  state: State;
  queryKey: string[];
  queryHash: string;
}

export interface State {
  data: MyFitnessGoals;
  dataUpdateCount: number;
  dataUpdatedAt: number;
  error: any;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
  fetchMeta: any;
  isInvalidated: boolean;
  status: string;
  fetchStatus: string;
}

export interface MyFitnessGoals {
  valid_from?: string;
  valid_to?: string;
  daily_goals?: MyFitnessDailyGoal[];
  default_group_id?: number;
  default_goal?: MyFitnessDefaultGoal;
  updated_at?: string;
  id?: string;
  username?: string;
  email?: string;
  goal_displays?: GoalDisplay[];
  unit_preferences?: UnitPreferences;
  diary_preferences?: DiaryPreferences;
  goal_preferences?: GoalPreferences;
  new_invitation_count?: number;
  unread_message_count?: number;
  userId: any;
  domain?: string;
  subscriptionReason: any;
  paymentProvider: any;
  productId: any;
  requestedCancellationDate: any;
  subscriptionEndDate: any;
  subscriptionStartDate: any;
  hasPremium?: boolean;
  willRenew?: boolean;
  subscriptionType: any;
  activeSubscriptionDetails: any;
  paymentDetails: any;
  discountedSkuEligible?: boolean;
  isTrialEligible?: boolean;
  consentMatrixVersion?: string;
  hasAccepted?: boolean;
  status?: string;
  gdprIsoCode?: string;
  standard?: string;
  locale?: string;
  adConsentsLastSeen?: string;
  elevatedAt: any;
  legacyDomain: any;
  ggUserDataUpdated?: string;
  region?: string;
  merged_user_id: any;
  user_changed_password_at?: string;
  password_migrated_at: any;
  system_changed_password_at: any;
  socialMediaLinks?: any[];
  userId_str?: string;
}

export interface MyFitnessDailyGoal {
  day_of_week: string;
  group_id: number;
  energy: Energy;
  carbohydrates: number;
  protein: number;
  fat: number;
  saturated_fat: number;
  polyunsaturated_fat: number;
  monounsaturated_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  fiber: number;
  sugar: number;
  vitamin_a: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
  assign_exercise_energy: string;
  exercise_carbohydrates_percentage: number;
  exercise_fat_percentage: number;
  exercise_protein_percentage: number;
  exercise_saturated_fat_percentage: number;
  exercise_sugar_percentage: number;
}

export interface Energy {
  value: number;
  unit: string;
}

export interface MyFitnessDefaultGoal {
  energy: Energy;
  carbohydrates: number;
  protein: number;
  fat: number;
  saturated_fat: number;
  polyunsaturated_fat: number;
  monounsaturated_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  fiber: number;
  sugar: number;
  vitamin_a: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
  assign_exercise_energy: string;
  exercise_carbohydrates_percentage: number;
  exercise_fat_percentage: number;
  exercise_protein_percentage: number;
  exercise_saturated_fat_percentage: number;
  exercise_sugar_percentage: number;
}
export interface GoalDisplay {
  id: string;
  display_type: string;
  nutrients: string[];
}

export interface UnitPreferences {
  energy: string;
  weight: string;
  distance: string;
  height: string;
  water: string;
}

export interface DiaryPreferences {
  default_add_food_view: string;
  meal_names: string[];
  tracked_nutrients: string[];
  diary_passcode: any;
}

export interface GoalPreferences {
  workouts_per_week: number;
  weekly_workout_duration: number;
  weekly_exercise_energy: WeeklyExerciseEnergy;
  weight_change_goal: WeightChangeGoal;
  weight_goal: WeightGoal;
  diary_goal_display: string;
  home_goal_display: string;
  macro_goal_format: string;
}

export interface WeeklyExerciseEnergy {
  value: number;
  unit: string;
}

export interface WeightChangeGoal {
  value: number;
  unit: string;
}

export interface WeightGoal {
  value: number;
  unit: string;
}
