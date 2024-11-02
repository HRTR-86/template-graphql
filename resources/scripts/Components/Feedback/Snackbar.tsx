import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import { PropsBase } from '@/scripts/Common/System';
import { TSnackbar } from '@/scripts/Provider/SnackbarProvider';

interface Props extends PropsBase {
  isOpen: boolean;
  snackbar: TSnackbar;
  handleClose: () => void;
}

const Snackbar = ({ sx, isOpen, snackbar, handleClose }: Props) => {
  return (
    <Display isDisplay={isOpen}>
      <MuiSnackbar
        sx={{
          '.MuiPaper-root': {
            alignItems: 'center',
            '.MuiAlert-message': {
              whiteSpace: 'break-spaces',
            },
          },
          ...sx,
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          severity={snackbar.type}
          variant={'filled'}
        >
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    </Display>
  );
};

export default Snackbar;
