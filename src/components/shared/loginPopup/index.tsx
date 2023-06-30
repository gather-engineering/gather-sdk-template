import { LoginPopupProps } from './props';
import { Dialog } from '../dialog';
import { LogoBox } from '../logoBox';
import { Button } from '../button';
import { Card } from '../card';
import { Box } from '../box';
import { Typography } from '../typography';
import { LoginPopupAction } from './loginPopupAction';
import { getPopupContent } from './getPopupContent';

export function LoginPopup(props: LoginPopupProps): JSX.Element {
  const popupContent = getPopupContent(props.dataSourceTitle, props.dataSource);

  return (
    <Dialog open={props.open} onClose={props.onClose} styles={{ width: '480px' }}>
      <Card
        styles={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '24px',
          width: '460px',
          gap: '32px',
        }}
      >
        <LogoBox logo={props.logo} size={88} styles={{ width: '88px', height: '88px' }} />
        <Box
          styles={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            styles={{ marginBottom: '15px', textAlign: 'left', fontWeight: '500' }}
          >
            {popupContent.title}
          </Typography>
          <Typography
            variant="body1"
            styles={{
              fontSize: '15px',
              color: '#484650',
              textAlign: 'left',
              lineHeight: '30px',
            }}
          >
            {popupContent.paragraph}
          </Typography>
          <Typography
            variant="body1"
            styles={{
              textAlign: 'left',
              fontSize: '15px',
              color: '#484650',
            }}
          >
            {popupContent.footer}
          </Typography>
        </Box>
        <LoginPopupAction {...props} />
        <Button
          variant="outlined"
          size="medium"
          onClick={props.onClose}
          styles={{ alignSelf: 'flex-end' }}
          label="Close"
        />
      </Card>
    </Dialog>
  );
}
