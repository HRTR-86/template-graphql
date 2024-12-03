import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, router } from '@inertiajs/react';
import PageBase from '@/scripts/Pages/PageBase';
import { useState } from 'react';
import usePostLogin from '@/scripts/Hooks/Login/usePostLogin';

const LoginPage = (props: any) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { postLogin } = usePostLogin();

  const handleChangeText = (newValue: any): void => {
    setForm({
      ...form,
      ...newValue,
    });
  };

  const handleLogin = (): void => {
    postLogin({
      data: form,
      only: [],
      handleSuccess: () => {},
      handleError: () => {},
    });
  };

  const handleLogout = (): void => {
    router.post('logout');
  };

  return (
    <PageBase isDisplayHeader={false}>
      <Typography>Loginページ</Typography>
      <Link href={'/'}>top</Link>
      <br />
      <Box
        sx={{
          width: '480px',
          padding: '16px 0 0 0',
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          id="outlined-error"
          label={'メールアドレス'}
          value={form.email}
          onChange={(e) => handleChangeText({ email: e.target.value })}
          error={!!props.errors?.text ?? false}
          helperText={props.errors?.text ?? ''}
        />
        <TextField
          id="outlined-error"
          label={'パスワード'}
          value={form.password}
          onChange={(e) => handleChangeText({ password: e.target.value })}
          error={!!props.errors?.text ?? false}
          helperText={props.errors?.text ?? ''}
        />
        <Button
          sx={{
            height: '56px',
            width: '120px',
            margin: '0 0 0 8px',
          }}
          color="success"
          variant="contained"
          onClick={handleLogin}
        >
          送信
        </Button>
        <Button
          sx={{
            height: '56px',
            width: '120px',
            margin: '0 0 0 8px',
          }}
          color="success"
          variant="outlined"
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </Box>
    </PageBase>
  );
};

export default LoginPage;
