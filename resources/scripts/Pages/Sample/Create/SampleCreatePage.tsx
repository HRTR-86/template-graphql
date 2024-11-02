import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Stack, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import PageBase from '@/scripts/Pages/PageBase';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { parseSampleCreateProps } from '@/scripts/Parser/Sample/Create/parseSampleCreateProps';
import { router } from '@inertiajs/react';
import SampleCommonForm, {
  defaultFormValue,
  TSampleCommonForm,
} from '@/scripts/Pages/Sample/SampleCommonForm';
import { useCallback, useState } from 'react';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import usePostCreateSample from '@/scripts/Hooks/Sample/usePostCreateSample';
import usePostCreateSampleChild from '@/scripts/Hooks/Sample/usePostCreateSampleChild';

const SampleCreatePage = (props: any) => {
  const { trnSampleChildList, errorList } = parseSampleCreateProps(props);

  const errorContext = useErrorContext();

  const [form, setForm] = useState<TSampleCommonForm>({
    ...defaultFormValue,
  });

  const { postCreateSample } = usePostCreateSample();
  const { postCreateSampleChild } = usePostCreateSampleChild(
    `/sample/create/child/create`,
  );

  /**
   * 入力フォームを更新する
   * @param newValues
   */
  const handleFormChange = useCallback(
    (newValues: Partial<TSampleCommonForm>): void => {
      setForm((currentValues) => ({
        ...currentValues,
        ...newValues,
      }));
    },
    [],
  );

  /**
   * キャンセルボタンのクリック時に元の画面に遷移する
   */
  const handleClickCancel = useCallback((): void => {
    const previous = sessionStorage.getItem('previous') ?? '/home';
    router.visit(previous);
  }, []);

  /**
   * データ登録の成功時に実行する処理
   */
  const handleSuccess = useCallback((): void => {
    setForm({ ...defaultFormValue });
  }, []);

  /**
   * データ登録の失敗時に実行する処理
   * @param errors
   */
  const handleError = useCallback((errors: Errors): void => {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  }, []);

  /**
   * 親テーブルのデータを登録する
   */
  const handlePost = useCallback((): void => {
    const isConfirmed = confirm('親テーブルデータを保存しますか？');
    if (!isConfirmed) {
      return;
    }

    postCreateSample({
      data: form,
      only: [],
      handleSuccess: handleSuccess,
      handleError: handleError,
    });
  }, [form]);

  return (
    <PageBase sx={{ padding: '16px 25%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={'h1'}>登録機能のサンプル</Typography>
        <Stack
          direction={'row'}
          spacing={1}
        >
          <BasicButton
            sx={{
              width: '120px',
            }}
            label={'キャンセル'}
            type={ButtonType.TERTIARY}
            onClick={handleClickCancel}
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
      <SampleCommonForm
        sx={{ margin: '16px 0' }}
        form={form}
        trnSampleChildList={trnSampleChildList}
        errorList={errorList}
        handleFormChange={handleFormChange}
        postCreateSampleChild={postCreateSampleChild}
      />
    </PageBase>
  );
};

export default SampleCreatePage;
