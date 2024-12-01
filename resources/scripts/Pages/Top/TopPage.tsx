import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import LoginModal from '@/scripts/Modals/Top/LoginModal';
import Modal from '@/scripts/Components/Modal';
import PageBase from '@/scripts/Pages/PageBase';
import { useCallback, useState } from 'react';
import SignUpModal from '@/scripts/Modals/Top/SignUpModal';

type ModalType = 'login' | 'signUp';

const TopPage = () => {
  const [openedModal, setOpenedModal] = useState<ModalType | null>(null);

  const handleOpenSignUp = useCallback(() => {
    setOpenedModal('signUp');
  }, []);

  const handleOpenLogin = useCallback(() => {
    setOpenedModal('login');
  }, []);

  const handleClose = useCallback(() => {
    setOpenedModal(null);
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
        <Stack
          spacing={1}
          direction={'row'}
        >
          <BasicButton
            sx={{
              width: '120px',
            }}
            type={ButtonType.TERTIARY}
            label={'新規登録'}
            onClick={handleOpenSignUp}
          />
          <BasicButton
            sx={{
              width: '120px',
            }}
            type={ButtonType.PRIMARY}
            label={'ログイン'}
            onClick={handleOpenLogin}
          />
        </Stack>
      </Box>
      <Typography>トップページ</Typography>
      <Modal
        isOpen={openedModal === 'signUp'}
        onClose={handleClose}
      >
        <SignUpModal />
      </Modal>
      <Modal
        isOpen={openedModal === 'login'}
        onClose={handleClose}
      >
        <LoginModal />
      </Modal>
    </PageBase>
  );
};

export default TopPage;
