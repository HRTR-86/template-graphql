import { Box, Modal as MuiModal, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PropsBase } from '@/scripts/Common/System';

interface Props extends PropsBase {
  isOpen: boolean;
  keepMounted?: boolean;
  handleClose: () => void;
}

const Modal = ({
  sx,
  isOpen = false,
  keepMounted = false,
  handleClose,
  children,
}: Props) => {
  const theme = useTheme();

  return (
    <MuiModal
      open={isOpen}
      keepMounted={keepMounted}
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: theme.palette.base.main,
          borderRadius: '4px',
          padding: '16px',
          ...sx,
        }}
      >
        <IconButton
          sx={{
            height: '32px',
            width: '32px',
            position: 'absolute',
            top: '14px',
            right: '14px',
          }}
          onClick={handleClose}
        >
          <CloseIcon
            sx={{
              color: theme.palette.object.main,
              fontSize: '24px',
            }}
          />
        </IconButton>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
