import { Box } from '../box';
import { Button } from '../button';
import { useDataImporterState } from '../hooks/useDataImporterState';
import { LogoBox } from '../logoBox';
import { Stack } from '../stack';
import { LoginPopupProps } from './props';
import { Typography } from '../typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle, faCircleCheck } from '@fortawesome/pro-duotone-svg-icons';
import { ImportState } from '@/dataStores/types/dataImporterState';

export const LoginPopupAction = ({
  dataSource,
  dataSourceTitle,
  onConfirm,
  logo,
}: LoginPopupProps) => {
  const state = useDataImporterState(dataSource);

  if (state?.errorState) {
    return (
      <Box
        styles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          border: `1px solid #FF5630`,
          backgroundColor: 'rgba(255,86,48,0.16)',
          borderRadius: '5px',
          minHeight: '50px',
          padding: '10px',
          width: '100%',
          gap: '10px',
        }}
      >
        <Box styles={{ flexDirection: 'row' }}>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color="#FF5630"
            style={{ marginRight: '10px', fontSize: '22px' }}
          />
          <Typography variant="body2" styles={{ color: '#B71D18' }}>
            There was an error while trying to login to {dataSourceTitle}.
          </Typography>
        </Box>
        {state?.errorMsg && <code style={{ color: '#B71D18' }}>{state?.errorMsg}</code>}
        <Button
          size="small"
          variant="text"
          onClick={onConfirm}
          styles={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '10px',
            color: '#B71D18',
            backgroundColor: '#FF563014',
          }}
          label="Retry"
        />
      </Box>
    );
  }

  if (state?.authState === 'pendingAuth') {
    return (
      <Box
        styles={{
          padding: '16px',
          backgroundColor: '#ab9ccc14',
          height: '154px',
          borderRadius: '10px',
        }}
      >
        <Stack
          styles={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box styles={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: '20px' }}>
            <FontAwesomeIcon
              icon={faCircleNotch}
              color="#74607d"
              spin
              style={{ marginTop: '5px' }}
            />
            <Typography
              variant="body2"
              styles={{
                marginLeft: 10,
                textAlign: 'left',
                color: '#74607d',
              }}
            >
              Please finish logging in to {dataSourceTitle}. We will request your data from{' '}
              {dataSourceTitle} once you are logged in.
            </Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            onClick={onConfirm}
            styles={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '10px',
              color: '#74607d',
              backgroundColor: '#ab9ccc14',
            }}
            label="Open login tab"
          />
        </Stack>
      </Box>
    );
  }

  if (state?.importState === ImportState.REQUEST_EMAIL_AUTHENTICATION) {
    return (
      <Box
        styles={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#e9fcef',
          borderRadius: '5px',
          minHeight: '80px',
          padding: '10px',
          width: '440px',
        }}
      >
        <FontAwesomeIcon
          icon={faCircleCheck}
          color="#087443"
          style={{ fontSize: '22px', marginTop: '5px' }}
        />
        <Typography
          variant="body2"
          styles={{ color: '#087443', marginLeft: '10px', textAlign: 'left' }}
        >
          Data request sent. We’ll let you know when {dataSourceTitle} replies to your data request.
          You may have to connect your gmail if you haven’t already.
        </Typography>
      </Box>
    );
  }

  if (state?.authState === 'authenticated') {
    return (
      <Box
        styles={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#e9fcef',
          borderRadius: '5px',
          minHeight: '80px',
          padding: '10px',
          width: '440px',
        }}
      >
        <FontAwesomeIcon
          icon={faCircleCheck}
          color="#087443"
          style={{ fontSize: '22px', marginTop: '5px' }}
        />
        <Typography
          variant="body2"
          styles={{ color: '#087443', marginLeft: '10px', textAlign: 'left' }}
        >
          SUCCESS! Go check out {'Raw Data'} to see your {dataSourceTitle} data in all of its glory.
        </Typography>
      </Box>
    );
  }

  return (
    <Button
      onClick={onConfirm}
      variant="outlined"
      size="large"
      styles={{ width: '100%', justifyContent: 'center' }}
    >
      <Box styles={{ flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
        <LogoBox logo={logo} size={32} />
        <p>{`Login to ${dataSourceTitle}`}</p>
      </Box>
    </Button>
  );
};
