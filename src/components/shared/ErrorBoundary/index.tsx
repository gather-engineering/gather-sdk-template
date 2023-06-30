import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { Card } from '../card';
import { Typography } from '../typography';
import { DataSourceType } from '@/constants/dataSources';

interface Props {
  importerName: DataSourceType;
  children: ReactNode;
}

function ErrorBoundary({ children, importerName }: Props) {
  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setTag('sdkVersion', `${__APP_NAME__}.v${__APP_VERSION__}`);
        scope.setTag('importer', importerName);
      }}
      fallback={(error) => (
        <Card>
          <Typography variant="subtitle1" styles={{ color: 'red' }}>
            Error: {error.error.message}
          </Typography>
        </Card>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

export default ErrorBoundary;
