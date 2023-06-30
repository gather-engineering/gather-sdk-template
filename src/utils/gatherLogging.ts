import { LogTypes } from '@/constants/logging';
import { ENVIRONMENT } from '@/constants/environment';

export type LogContext = {
  metricId: string;
  feature?: string;
  action?: string;
  error?: any;
  context?: any;
  status?: string;
  emailTitle?: string;
};

export default function gatherLogging(logType: LogTypes, context?: LogContext) {
  const logData = {
    type: logType,
    message: { ...context },
    sdk_env: ENVIRONMENT.NODE_ENV || 'local',
  };
  const logUrl = `${ENVIRONMENT.GATHER_OAUTH_URL}/log`;
  fetch(logUrl, {
    method: 'POST',
    body: JSON.stringify(logData),
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
