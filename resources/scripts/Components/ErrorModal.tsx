import { Box, Typography, useTheme } from '@mui/material';
import Modal from '@/scripts/Components/Modal';
import { PropsBase } from '@/scripts/Common/System';
import { TError } from '@/scripts/Parser/Common/parseErrorProps';
import WarningIcon from '@mui/icons-material/Warning';

interface Props extends PropsBase {
  isOpen: boolean;
  error: TError;
  handleClose: () => void;
}

const ErrorModal = ({ sx, isOpen = false, error, handleClose }: Props) => {
  const theme = useTheme();

  return (
    <Modal
      sx={sx}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          color: theme.palette.error.main,
          margin: '0 0 16px 0',
        }}
      >
        <WarningIcon />
        <Typography
          sx={{ color: theme.palette.error.main }}
          variant={'caption'}
        >
          {error.title}
        </Typography>
      </Box>
      <Typography sx={{ margin: '0 0 4px 0' }}>{error.message}</Typography>
      <Typography>{`エラーコード：${error.code}`}</Typography>
    </Modal>
  );
};

export default ErrorModal;
