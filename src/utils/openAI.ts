import { OPENAI_COMPLETION_URL } from '../constants/openAI';
import { parsingJson } from '../importers/gmail/utils';

export const completion = async (
  replacement: string | string[],
  prompt: string,
  feature: string
): Promise<any> => {
  if (!replacement) throw new Error('Replacement missing.');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      replacement,
      feature,
      app: 'SDK',
      max_tokens: 800,
    }),
  };

  const response = await fetch(OPENAI_COMPLETION_URL, options);

  if (!response.ok) {
    throw new Error(`Failed to classify: ${response.statusText}`);
  }

  const data = await response.text();

  return parsingJson(data);
};
