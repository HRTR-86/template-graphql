import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import PageBase from '@/scripts/Pages/PageBase';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import ProfileForm, { Form } from '@/scripts/Pages/Profile/ProfileForm';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useMutationProfileEdit } from '@/scripts/Hooks/Mutation/Profile/useMutationProfileEdit';
import { useSnackbarContext } from '@/scripts/Provider/SnackbarProvider';
import { useQueryProfile } from '@/scripts/Hooks/Query/Profile/useQueryProfile';

const HomePage = () => {
  const authUserContext = useAuthUserContext();
  const snackbarContext = useSnackbarContext();
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const { data } = useQueryProfile();
  const { profileEdit } = useMutationProfileEdit();

  // TODO: 初期値が設定されないので修正する
  const [form, setForm] = useState<Form>({
    userName: authUserContext.authUser.name,
    roleId:
      data.trnUserRoleList.find((trnUserRole) => trnUserRole.isCurrent)
        ?.roleId ?? 0,
  });

  useEffect(() => {
    if (!data.flash.message || !!snackbarContext.snackbar.message) {
      return;
    }

    snackbarContext.handleChange({
      message: data.flash.message,
    });
  }, [data.flash.message]);

  /**
   * 入力フォームを更新する
   * @param newValues
   */
  const handleFormChange = useCallback((newValues: Partial<Form>): void => {
    setForm((currentValues) => ({
      ...currentValues,
      ...newValues,
    }));
  }, []);

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
  const handlePost = async (): Promise<void> => {
    const isConfirmed = confirm('プロフィールを保存しますか？');
    if (!isConfirmed) {
      return;
    }

    profileEdit({
      variables: {
        user_name: form.userName,
        role_id: form.roleId,
      },
    });
    // TODO: 再取得処理を実装する
  };

  /**
   * ホーム画面に戻る
   */
  const handleClickBack = (): void => {
    navigate('/home');
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
        trnUserRoleList={data.trnUserRoleList}
        handleFormChange={handleFormChange}
        errorList={data.errorList}
      />
    </PageBase>
  );
};

export default HomePage;
