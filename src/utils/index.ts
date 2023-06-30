/**
 * Replace all the new lines and multiple spaces in the text
 * @param <string> data
 * @returns string
 */
export const replaceMultipleSpacesAndNewLines = (data: string): string => {
  return data.replace(/^\s*|\s*$|\s*(\r?\n)\s*|(\s)\s+/g, ' ');
};
