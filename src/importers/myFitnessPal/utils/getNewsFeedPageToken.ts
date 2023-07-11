export const getNewsFeedPageToken = (link: string | null) => {
  if (!link) return;
  const regex = /<([^>]+)>;\s*rel=next/;
  const match = link.match(regex);
  const firstURL = match ? match[1] : null;
  if (!firstURL) return;
  const params = new URLSearchParams(new URL(firstURL).search);
  return params.get('page_token');
};
