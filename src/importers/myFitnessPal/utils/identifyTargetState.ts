import { MY_FITNESS_PAL_IMPORT_FLOW_STATES } from '@/importers/myFitnessPal/constants';
import { isHavingData } from '@/importers/myFitnessPal/utils/index';

export const identifyTargetState = async (
  context: any
): Promise<{
  targetState: string;
  hasData: boolean;
}> => {
  let { targetState, finishedCurrentState } = context;

  const hasData = await isHavingData();

  switch (targetState) {
    case '':
      targetState = MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_GOALS;
      break;
    case MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_GOALS:
      if (!finishedCurrentState) break;
      targetState = MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_COMPLETED;
      break;
    case MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_COMPLETED:
      targetState = MY_FITNESS_PAL_IMPORT_FLOW_STATES.IMPORT_COMPLETED;
      break;
    default:
      break;
  }

  // if no state above is matched or the current state haven't finished, return the original state
  return { targetState, hasData };
};
