import {
  GATHER_OAUTH_URL,
  GATHER_OAUTH_WINDOW_WIDTH,
  GATHER_OAUTH_WINDOW_HEIGHT,
} from '@/constants/gather';
import { AuthWindowManager } from '@/utils/authWindowManager';
import { Oauth2 } from '@/utils/oauth2';

interface GetOauthProps {
  access_token: string;
  user_id?: string;
  scope?: string;
  email?: string;
}

/**
 * This function is used to get OAuth access token from Gather API
 * @param dataSource
 * @param interactive
 * @returns
 */
function getOAuthAccessToken(dataSource: string, interactive: boolean): Promise<GetOauthProps> {
  return new Promise<GetOauthProps>((resolve, reject) => {
    let eventSource = new EventSource(
      `${GATHER_OAUTH_URL}?dataSource=${dataSource}&interactive=${interactive}`,
      {
        withCredentials: true,
      }
    );

    let wasUserClosedAuthWindowWithoutProceeding = true;

    const onAuthWindowClosed = () => {
      if (wasUserClosedAuthWindowWithoutProceeding) {
        eventSource.close();
        reject('User closed authorization window without proceeding');
      }
    };

    eventSource.addEventListener('message', (event: MessageEvent) => {
      try {
        const { data } = event;
        const { messages } = JSON.parse(data);

        if (Array.isArray(messages) && messages.length) {
          messages.forEach(
            async ({ type, value, access_token, refresh_token, user_id, scope, email }) => {
              /**
               * Show authorization window
               */
              if (type === 'authUrl') {
                await AuthWindowManager.openCenteredWindow(
                  value,
                  GATHER_OAUTH_WINDOW_WIDTH,
                  GATHER_OAUTH_WINDOW_HEIGHT,
                  onAuthWindowClosed
                );
              }

              /** Close it when we have the token */
              if (access_token || refresh_token) {
                Oauth2.saveToken(dataSource, { access_token, refresh_token });
                wasUserClosedAuthWindowWithoutProceeding = false;
                AuthWindowManager.closeAuthWindow();
                eventSource.close();
                resolve({ access_token, user_id, scope, email });
              }
            }
          );
        }
      } catch (error) {
        console.error(`${dataSource} getOAuthAccessToken error:`, error);
        wasUserClosedAuthWindowWithoutProceeding = false;
        eventSource.close();
        reject('Error');
      }
    });

    eventSource.addEventListener('error', (event: MessageEvent) => {
      console.error(`${dataSource} getOAuthAccessToken error:`, event);
      wasUserClosedAuthWindowWithoutProceeding = false;
      AuthWindowManager.closeAuthWindow();
      eventSource.close();
      reject('Error');
    });
  });
}

export { getOAuthAccessToken };
