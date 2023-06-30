import { UserInfo } from '@/components/utils/props';
import {
  BrowserClient,
  defaultStackParser,
  defaultIntegrations,
  makeFetchTransport,
  Hub,
} from '@sentry/browser';
import gatherLogging, { LogContext } from '@/utils/gatherLogging';
import { LogTypes } from '@/constants/logging';
import { ExtraErrorData as ExtraErrorDataIntegration } from '@sentry/integrations';
import { ENVIRONMENT } from '@/constants/environment';

class ErrorLogger {
  private sentryHub: Hub;

  constructor() {
    const client = new BrowserClient({
      dsn: ENVIRONMENT.PUBLIC_SENTRY_DSN,
      release: __APP_VERSION__,
      environment: ENVIRONMENT.NODE_ENV === 'production' ? 'production' : 'staging',
      transport: makeFetchTransport,
      stackParser: defaultStackParser,
      integrations: [...defaultIntegrations, new ExtraErrorDataIntegration()],
      initialScope: {
        tags: {
          runTime: 'gather-sdk-background',
          sdkVersion: `${__APP_NAME__}.v${__APP_VERSION__}`,
        },
      },
    });

    this.sentryHub = new Hub(client);
  }

  setUserContext(userInfo?: UserInfo) {
    const userId = userInfo?.id ?? 'unknown';
    const email = userInfo?.email ?? 'unknown';
    this.sentryHub.setUser({
      id: userId,
      email: email,
    });
    this.sentryHub.setTag('userId', userId);
    this.sentryHub.setTag('email', email);
  }

  captureException(error: unknown, context?: LogContext) {
    this.sentryHub.withScope((scope) => {
      if (error instanceof Error) {
        scope.setExtra('cause', error.cause);
      }
      this.sentryHub.captureException(error);
    });
    gatherLogging(LogTypes.ERROR, context);
  }
}

export const errorLogger = new ErrorLogger();
