import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import GoogleIcon from '@/scripts/Asset/Image/googleIcon.svg';
import InputField from '@/scripts/Components/Form/InputField';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { PropsBase } from '@/scripts/Common/System';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import usePostLogin from '@/scripts/Hooks/Login/usePostLogin';
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

interface Props extends PropsBase {}

const LoginModal = (_: Props) => {
  const theme = useTheme();

  const errorContext = useErrorContext();

  const [form, setForm] = useState<LoginForm>({
    email: 'hoshi-ryotaro@919.jp',
    password: 'password',
  });

  const { postLogin } = usePostLogin();

  /**
   * 入力フォームの更新
   * @param newValues
   */
  const handleChange = (newValues: Partial<LoginForm>) => {
    setForm({ ...form, ...newValues });
  };

  /**
   * データ登録の失敗時に実行する処理
   * @param errors
   */
  const handleError = (errors: Errors): void => {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  };

  /**
   * 子テーブルのデータを登録する
   */
  const handlePost = (): void => {
    postLogin({
      data: form,
      only: [],
      handleSuccess: () => {},
      handleError: handleError,
    });
  };

  return (
    <Stack spacing={3}>
      <Typography
        sx={{ display: 'flex', justifyContent: 'center' }}
        variant={'h2'}
      >
        ログイン
      </Typography>
      <BasicButton
        type={ButtonType.OUTLINE}
        label={
          <>
            <Box
              component={'img'}
              src={GoogleIcon}
              alt={'logo'}
            />
            Googleログイン
          </>
        }
        href={'/login/google'}
      />
      <Stack
        sx={{ display: 'flex', justifyContent: 'center' }}
        direction={'row'}
      >
        <Typography sx={{ color: theme.palette['object-sub'].main }}>
          または
        </Typography>
      </Stack>
      <Stack spacing={1}>
        <InputField
          value={form.email}
          onChange={(value) => handleChange({ email: value })}
        />
        <InputField
          value={form.password}
          onChange={(value) => handleChange({ password: value })}
        />
        <BasicButton
          type={ButtonType.PRIMARY}
          label={'ログイン'}
          onClick={handlePost}
        />
      </Stack>
    </Stack>
  );
};

export default LoginModal;
