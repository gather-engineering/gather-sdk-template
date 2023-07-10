export const getRequestTokenFromURL = (url: string): string | undefined => {
  const regex = [`/\\/_next\\/data\\/([^/]+)/`, `/_next\\/static\\/(.*?)\\/_buildManifest.js`];
  for (const r of regex) {
    const match = url.match(r);
    if (match) {
      return match[1];
    }
  }
};
