import { BASE_STATES } from '@/importers/sharedXState/baseStates.common';
import { IMPORT_FLOW_STATES } from '@/importers/sharedXState/importFlowStates.common';

export enum AMAZON_SPECIFIC_STATES {}

export const AMAZON_IMPORT_FLOW_STATES = {
  ...AMAZON_SPECIFIC_STATES,
  ...IMPORT_FLOW_STATES,
  ...BASE_STATES,
};

export enum AmazonTableNames {
  /* TODO: Add table names here */
}