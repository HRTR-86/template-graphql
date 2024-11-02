import {
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { Errors } from '@inertiajs/core/types/types';
import Loading from '../Feedback/Loading';
import { Logout } from '@mui/icons-material';
import { MouseEvent, useState } from 'react';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { useAuthUserContext } from '../../Provider/AuthUserProvider';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import usePostLogout from '@/scripts/Hooks/Login/usePostLogout';
import { router } from '@inertiajs/react';

const UserMenu = () => {
  const authUserContext = useAuthUserContext();
  const errorContext = useErrorContext();
  const theme = useTheme();

  const { postLogout } = usePostLogout();

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const StyledImg = styled('img')({
    height: '36px',
    width: '36px',
    borderRadius: '50%',
  });

  const StyledMenuItem = styled(MenuItem)({
    minWidth: '160px',
    padding: '10px 16px',
    display: 'flex',
    color: theme.palette.object.main,
  });

  /**
   * メニューを開く.
   * @param event
   */
  const handleOpen = (event: MouseEvent<HTMLDivElement>) => {
    setAnchor(event.currentTarget);
  };

  /**
   * メニューを閉じる.
   */
  const handleClose = (): void => {
    setAnchor(null);
  };

  /**
   * ログアウト失敗時の処理
   * @param errors
   */
  const handleError = (errors: Errors): void => {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  };

  /**
   * ログアウト処理を実行する
   */
  const handleLogout = (): void => {
    postLogout(handleError);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          gap: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'color 0.2s ease-out',
        }}
        onClick={handleOpen}
      >
        <Loading isLoading={false}>
          <Typography>{authUserContext.authUser.name}</Typography>
          <StyledImg
            alt={'profile'}
            src={authUserContext.authUser.imageUrl}
          />
        </Loading>
      </Box>
      <Menu
        sx={{
          minWidth: '160px',
          '.MuiList-root': {
            padding: '0',
          },
        }}
        autoFocus={false}
        anchorEl={anchor}
        open={Boolean(anchor)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '8px',
          }}
        >
          <StyledImg
            alt={'profile'}
            src={authUserContext.authUser.imageUrl}
          />
          <Box
            style={{
              padding: '0',
            }}
          >
            <Typography>{authUserContext.authUser.name}</Typography>
            <Typography>{authUserContext.authUser.email}</Typography>
          </Box>
        </Box>
        <Divider sx={{ margin: '0 16px' }} />
        <StyledMenuItem
          sx={{ padding: '8px 16px' }}
          onClick={() => router.visit('/profile')}
        >
          <Typography>プロフィール</Typography>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: '28px !important' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography>ログアウト</Typography>
        </StyledMenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
