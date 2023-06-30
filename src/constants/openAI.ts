import { ENVIRONMENT } from "@/constants/environment";

export const OPENAI_MODEL_NAME = "text-davinci-003";
export const OPENAI_CHAT_MODEL_NAME = "gpt-3.5-turbo";
export const OPENAI_COMPLETION_URL = ENVIRONMENT.OPENAI_COMPLETION_URL;
export const CUISINE_PROMPT =
  "Pho cuisines are Vietnamese,East Asian,Asian\tTeokbokki cuisines are Korean,East Asian,Asian\n_PLACE_HOLDER_ cuisines are";
export const CATEGORIZATION_PROMPT = `Classify the below title with the best fit category from the below categories. If none of the categories fit, set to Uncategorized. Return the category in between double quotes.

Title:
_PLACE_HOLDER_

Categories:
`;

// This length is equal to 2000 token
export const MAX_LENGTH_PROMPT_DATA = 8000;
export const MAX_TOKENS = 800;
