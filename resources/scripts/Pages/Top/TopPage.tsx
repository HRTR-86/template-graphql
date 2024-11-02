import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import PageBase from '@/scripts/Pages/PageBase';

const TopPage = () => {
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
          type={ButtonType.SECONDARY}
          label={'ログイン'}
          href={'/login'}
        />
      </Box>
      <Typography>トップページ</Typography>
    </PageBase>
  );
};

export default TopPage;
