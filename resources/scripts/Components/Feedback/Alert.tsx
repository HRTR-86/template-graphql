import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import { PropsBase } from '@/scripts/Common/System';

interface Props extends PropsBase {
  isOpen: boolean;
  severity?: 'success' | 'info' | 'warning' | 'error';
  variant: string;
  message: string;
  title: string;
  handleClose?: () => void;
}

const Alert = ({
  sx,
  isOpen,
  severity = 'error',
  title,
  message,
  handleClose,
}: Props) => {
  return (
    <Display isDisplay={isOpen}>
      <MuiAlert
        sx={{
          '.MuiAlert-icon': {
            alignItems: 'center',
          },
          ...sx,
        }}
        severity={severity}
        variant="filled"
        onClose={handleClose}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </MuiAlert>
    </Display>
  );
};

export default Alert;
