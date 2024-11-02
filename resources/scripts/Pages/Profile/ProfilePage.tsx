import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import PageBase from '@/scripts/Pages/PageBase';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { parseProfileProps } from '@/scripts/Parser/Profile/parseProfileProps';
import ProfileForm, { TProfileForm } from '@/scripts/Pages/Profile/ProfileForm';
import { router } from '@inertiajs/react';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useCallback, useEffect, useState } from 'react';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';
import usePostEditProfile from '@/scripts/Hooks/Profile/usePostEditProfile';

const HomePage = (props: any) => {
  const { trnUserRole, flash, errorList } = parseProfileProps(props);

  const authUserContext = useAuthUserContext();
  const snackbarContext = useSnackbarContext();
  const errorContext = useErrorContext();

  const [form, setForm] = useState<TProfileForm>({
    userName: authUserContext.authUser.name,
    roleId: trnUserRole.role_id,
  });

  const { postEditProfile } = usePostEditProfile();

  useEffect(() => {
    if (!flash.message || !!snackbarContext.snackbar.message) {
      return;
    }

    snackbarContext.handleChange({
      message: flash.message,
    });
  }, [flash.message]);

  /**
   * 入力フォームを更新する
   * @param newValues
   */
  const handleFormChange = useCallback(
    (newValues: Partial<TProfileForm>): void => {
      setForm((currentValues) => ({
        ...currentValues,
        ...newValues,
      }));
    },
    [],
  );

  /**
   * データ登録の失敗時に実行する処理
   * @param errors
   */
  const handleError = (errors: Errors): void => {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  };

  /**
   * プロフィールを編集する
   */
  const handlePost = (): void => {
    const isConfirmed = confirm('プロフィールを保存しますか？');
    if (!isConfirmed) {
      return;
    }

    postEditProfile({
      data: form,
      only: [],
      handleSuccess: () => {},
      handleError: handleError,
    });
  };

  /**
   * ホーム画面に戻る
   */
  const handleClickBack = (): void => {
    router.visit('/home');
  };

  return (
    <PageBase sx={{ padding: '16px 30%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            margin: '0 0 16px 0',
            lineHeight: '36px',
          }}
          variant={'h1'}
        >
          プロフィール
        </Typography>
        <Stack
          direction={'row'}
          spacing={1}
        >
          <BasicButton
            sx={{
              width: '120px',
            }}
            label={'戻る'}
            type={ButtonType.TERTIARY}
            onClick={handleClickBack}
          />
          <BasicButton
            sx={{
              width: '120px',
            }}
            label={'保存する'}
            onClick={handlePost}
          />
        </Stack>
      </Box>
      <ProfileForm
        form={form}
        handleFormChange={handleFormChange}
        errorList={errorList}
      />
    </PageBase>
  );
};

export default HomePage;
