export const getCSRFTokenFromResponse = async (response: Response) => {
  const htmlText = await response.text();
  const doc = new DOMParser().parseFromString(htmlText, 'text/html');
  return doc.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};
