export function requestChromePermissionsIfNecessary(
  permissions: chrome.permissions.Permissions
): Promise<{ ok: boolean; error?: string }> {
  return new Promise((resolve) => {
    chrome.permissions.contains(permissions, (result) => {
      if (!result) {
        chrome.permissions.request(permissions, (granted) => {
          if (granted) {
            console.info(`${String(permissions.permissions)} permission granted.`);
            resolve({ ok: true });
          } else {
            resolve({ ok: false, error: 'Permission not granted.' });
          }
        });
      } else {
        resolve({ ok: true });
      }
    });
  });
}
