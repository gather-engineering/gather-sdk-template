import { ImportState } from '@/dataStores/types/dataImporterState';
import { Typography } from '../typography';
import { Box } from '../box';

type BaseDownloadInfoProps = {
  importState: ImportState | undefined;
  dataSourceTitle: string;
};

export default function BaseDownloadInfo({
  importState,
  dataSourceTitle,
}: BaseDownloadInfoProps): JSX.Element | null {
  let content = null;
  if (importState === ImportState.REQUEST_EMAIL_AUTHENTICATION) {
    content = 'Connect your gmail to confirm your data request.';
  }

  if (importState === ImportState.UPLOAD_FILE_READY) {
    content = `Your data is ready to download. Click the Download button to download your ${dataSourceTitle} data.`;
  }

  if (importState === ImportState.PENDING_UPLOAD) {
    content = `${dataSourceTitle} usually fulfills data request in 3-5 days.`;
  }

  return content === null ? null : (
    <Box styles={{ flexDirection: 'row', padding: '10px', maxWidth: '300px' }}>
      <Typography variant="body2">{content}</Typography>
    </Box>
  );
}
