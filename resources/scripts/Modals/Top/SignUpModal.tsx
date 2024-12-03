import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import GoogleIcon from '@/scripts/Asset/Image/googleIcon.svg';
import InputField from '@/scripts/Components/Form/InputField';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { PropsBase } from '@/scripts/Common/System';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import usePostSignUp from '@/scripts/Hooks/Login/usePostSignUp';
import { useState } from 'react';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface Props extends PropsBase {}

const SignUpModal = (_: Props) => {
  const theme = useTheme();

  const errorContext = useErrorContext();

  const [form, setForm] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
  });

  const { postSignUp } = usePostSignUp();

  /**
   * 入力フォームの更新
   * @param newValues
   */
  const handleChange = (newValues: Partial<SignUpForm>) => {
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
   * 新規登録用データを送信する
   */
  const handlePost = (): void => {
    postSignUp({
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
        新規登録
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
            Googleで新規登録
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
        {/* TODO: バリデーションのエラーメッセージを表示する */}
        <InputField
          value={form.name}
          placeholder={'名前'}
          onChange={(value) => handleChange({ name: value })}
        />
        <InputField
          value={form.email}
          placeholder={'メールアドレス'}
          onChange={(value) => handleChange({ email: value })}
        />
        <InputField
          value={form.password}
          placeholder={'パスワード'}
          type={'password'}
          onChange={(value) => handleChange({ password: value })}
        />
        <BasicButton
          type={ButtonType.PRIMARY}
          label={'新規登録'}
          onClick={handlePost}
        />
      </Stack>
    </Stack>
  );
};

export default SignUpModal;
