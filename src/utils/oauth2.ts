import { ENVIRONMENT } from '@/constants/environment';

type Token = {
  access_token: string;
  refresh_token: string;
};

type CookieOptions = {
  expirationDate?: number;
  secure?: boolean;
  httpOnly?: boolean;
};

export class Oauth2 {
  static async saveToken(
    dataSource: string,
    { access_token, refresh_token }: Token,
    options?: CookieOptions
  ) {
    const token = JSON.stringify({ access_token, refresh_token });
    if (!token || token === '{}') return;
    return await chrome.cookies.set({
      url: ENVIRONMENT.GATHER_AUTH_URL,
      name: dataSource,
      value: token,
      expirationDate: options?.expirationDate,
      secure: true,
      httpOnly: options?.httpOnly,
    });
  }

  static getToken(dataSource: string) {
    return new Promise((resolve) => {
      chrome.cookies.get(
        {
          url: ENVIRONMENT.GATHER_AUTH_URL,
          name: dataSource,
        },
        (cookie) => {
          if (cookie) {
            const token = JSON.parse(cookie.value) as Token;
            resolve(token);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  static async refreshToken(dataSource: string) {
    const token = this.getToken(dataSource);
    if (!token) {
      throw Error('No token found');
    }

    try {
      const response = await fetch(`${ENVIRONMENT.OAUTH2_REFRESH_TOKEN_URL}/${dataSource}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataSource, ...token }),
      });

      if (!response.ok) {
        throw Error('Failed to refresh token');
      }

      const data = await response.json();
      await this.saveToken(dataSource, data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
