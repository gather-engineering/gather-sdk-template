import { CATEGORIZATION_PROMPT } from '@/constants/openAI';
import { completion } from '@/utils/openAI';
import { PRODUCT_CATEGORY_LIST } from '@/constants/dataSources';

export const classifyCategory = async (title: string, feature: string): Promise<string> => {
  const prompt = CATEGORIZATION_PROMPT + PRODUCT_CATEGORY_LIST.join('\n');
  const data = await completion(title, prompt, feature);
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) return data[0];
  return '';
};

export const batchClassifyCategory = async (
  asins: string[],
  feature: string
): Promise<string[]> => {
  const prompt = CATEGORIZATION_PROMPT + PRODUCT_CATEGORY_LIST.join('\n');
  return await completion(asins, prompt, feature);
};
