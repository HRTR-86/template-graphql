import { Box, useTheme } from '@mui/material';
// import { CSSProperties } from 'react';
import { PropsBase } from '@/scripts/Common/System';

interface IProps extends PropsBase {}

const Logo = (_: IProps) => {
  return <Dummy />;

  // TODO: ロゴ画像が完成したら以下のコメントアウトを外す
  // return (
  //   <img
  //     style={{
  //       height: '24px',
  //       ...(sx as CSSProperties),
  //     }}
  //     alt={'ロゴ'}
  //     src={'/image/logo.png'}
  //   />
  // );
};

export default Logo;

const Dummy = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '36px',
        width: '120px',
        borderRadius: '4px',
        color: theme.palette.base.main,
        backgroundColor: theme.palette['border-strong'].main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      ロゴ
    </Box>
  );
};
