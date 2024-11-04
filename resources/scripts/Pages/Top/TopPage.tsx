import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import LoginModal from '@/scripts/Modals/Top/LoginModal';
import Modal from '@/scripts/Components/Modal';
import PageBase from '@/scripts/Pages/PageBase';
import { useCallback, useState } from 'react';

const TopPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <PageBase
      sx={{ padding: '0px' }}
      isDisplayHeader={false}
    >
      <Box
        sx={{
          height: '56px',
          padding: '8px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <BasicButton
          sx={{
            width: '120px',
          }}
          type={ButtonType.PRIMARY}
          label={'ログイン'}
          onClick={handleOpen}
        />
      </Box>
      <Typography>トップページ</Typography>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
      >
        <LoginModal />
      </Modal>
    </PageBase>
  );
};

export default TopPage;
