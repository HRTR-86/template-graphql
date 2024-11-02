import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import PageBase from '@/scripts/Pages/PageBase';
import WarningIcon from '@mui/icons-material/Warning';

const ErrorPage = (props: any) => {
  const theme = useTheme();

  return (
    <PageBase
      sx={{
        height: '100vh',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.overlay.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isDisplayHeader={false}
    >
      <Paper
        sx={{
          height: 'fit-content',
          width: '30%',
          padding: '16px',
        }}
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
            {props.error.title}
          </Typography>
        </Box>
        <Typography sx={{ margin: '0 0 4px 0' }}>
          {props.error.message}
        </Typography>
        <Typography>{`エラーコード：${props.error.code}`}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '16px 0 0 0',
          }}
        >
          <BasicButton
            type={ButtonType.SECONDARY}
            label={'戻る'}
            href={'/home'}
          />
        </Box>
      </Paper>
    </PageBase>
  );
};

export default ErrorPage;
