export class AuthWindowManager {
  static authWindowId: number | undefined;
  static authWindow: Window | null;

  static openCenteredWindowWithinExtension = async (
    url: string,
    width: number,
    height: number,
    top: number,
    left: number,
    onClose?: any,
    focused?: boolean
  ): Promise<number | undefined> => {
    const authWindow = await chrome.windows.create({
      url,
      type: 'normal',
      width,
      height,
      left,
      top,
      focused,
    });

    AuthWindowManager.authWindowId = authWindow.id;

    const focusToAuthWindow = () => {
      if (AuthWindowManager.authWindowId)
        chrome.windows.update(AuthWindowManager.authWindowId, { focused: true }).catch(() => {});
    };

    const onWindowRemovedListener = (windowId: number) => {
      if (windowId === AuthWindowManager.authWindowId) {
        AuthWindowManager.authWindowId = undefined;
        onClose?.();
        chrome.windows.onRemoved.removeListener(onWindowRemovedListener);
        chrome.tabs.onActivated.removeListener(onTabActivatedListener);
        window.onmouseover = null;
      }
    };

    const onTabActivatedListener = (activeInfo: chrome.tabs.TabActiveInfo) => {
      chrome.tabs.getCurrent((tab) => {
        if (activeInfo.tabId === tab?.id) focusToAuthWindow();
      });
    };

    if (AuthWindowManager.authWindowId) {
      authWindow.alwaysOnTop = true;
      authWindow.focused = true;
      chrome.windows.onRemoved.addListener(onWindowRemovedListener);

      window.onmouseover = focusToAuthWindow;
      chrome.tabs.onActivated.addListener(onTabActivatedListener);
    }

    return AuthWindowManager.authWindowId;
  };

  static openCenteredWindowWithinBrowser = async (
    url: string,
    width: number,
    height: number,
    top: number,
    left: number,
    onClose?: any
  ): Promise<Window | null> => {
    AuthWindowManager.authWindow = window.open(
      url,
      '_blank',
      `toolbar=no,scrollbars=no,resizable=no,width=${width},height=${height},left=${left},top=${top}`
    );

    if (AuthWindowManager.authWindow) {
      /* Can't make beforeunload to works in Chrome */
      /* Also cannot move the other cross-domain window (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) */
      const intervalId = setInterval(() => {
        if (AuthWindowManager.authWindow && AuthWindowManager.authWindow.closed) {
          onClose?.();
          clearInterval(intervalId);
        }
      }, 1000);

      AuthWindowManager.authWindow.focus();
      window.onmousemove = () => {
        if (AuthWindowManager.authWindow) AuthWindowManager.authWindow.focus();
      };
    }

    return AuthWindowManager.authWindow;
  };

  static openCenteredWindow = async (
    url: string,
    width: number,
    height: number,
    onClose?: any
  ): Promise<number | Window | null> => {
    /* These values must be integer if using chrome.windows */
    const left = Math.floor(window.screen.width / 2 - width / 2);
    const top = Math.floor(window.screen.height / 2 - height / 2);
    const focused = true;

    const authWindowOrId =
      chrome && chrome.windows
        ? await AuthWindowManager.openCenteredWindowWithinExtension(
            url,
            width,
            height,
            top,
            left,
            onClose,
            focused,
          )
        : await AuthWindowManager.openCenteredWindowWithinBrowser(
            url,
            width,
            height,
            top,
            left,
            onClose
          );

    window.onbeforeunload = () => {
      AuthWindowManager.closeAuthWindow();
      window.onbeforeunload = null;
    };

    return authWindowOrId || null;
  };

  static closeAuthWindow = () => {
    if (AuthWindowManager.authWindowId && chrome && chrome.windows)
      chrome.windows.remove(AuthWindowManager.authWindowId).catch(() => {});
    if (AuthWindowManager.authWindow) AuthWindowManager.authWindow.close();
  };
}
