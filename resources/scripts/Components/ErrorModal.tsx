import { Button, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { PropsBase } from '@/scripts/Common/System';

interface Props extends PropsBase {
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ title, message, onClose }: Props) => {
  return (
    <>
      <ErrorIcon
        color={'error'}
        sx={{ fontSize: '3rem' }}
      />
      <Typography sx={{ mt: 1, fontSize: '1rem', fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography
        noWrap
        sx={{ mt: 1, fontSize: '0.75rem' }}
        align={'left'}
      >
        頻発する場合は開発者にお問い合わせください
      </Typography>
      {message && (
        <Typography
          noWrap
          sx={{ fontSize: '0.75rem' }}
          align={'left'}
        >
          {message}
        </Typography>
      )}
      <Button
        color={'error'}
        variant="contained"
        onClick={onClose}
        sx={{ mt: 3, width: '100%' }}
      >
        閉じる
      </Button>
    </>
  );
};

export default ErrorModal;
