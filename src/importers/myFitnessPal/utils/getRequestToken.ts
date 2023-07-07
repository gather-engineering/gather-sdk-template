export const getRequestTokenFromURL = (url: string) => {
  const match = url.match(/\/_next\/data\/([^/]+)/);
  return match ? match[1] : null;
};
