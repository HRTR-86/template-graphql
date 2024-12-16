import { Box, Stack, Typography } from '@mui/material';
import BasicButton from '@/scripts/Components/Button/BasicButton';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import PageBase from '@/scripts/Pages/PageBase';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { parseSampleEditProps } from '@/scripts/Parser/Sample/Edit/parseSampleEditProps';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import { router } from '@inertiajs/react';
import SampleCommonForm, {
  defaultFormValue,
  Form,
} from '@/scripts/Pages/Sample/SampleCommonForm';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useNavigate } from 'react-router-dom';
import usePostEditSample from '@/scripts/Hooks/Sample/usePostEditSample';
import usePostCreateSampleChild from '@/scripts/Hooks/Sample/usePostCreateSampleChild';
import { useState } from 'react';

const SampleEditPage = (props: any) => {
  const { trnSampleParent, trnSampleChildList, errorList } =
    parseSampleEditProps(props);

  const authUserContext = useAuthUserContext();
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    parentId: trnSampleParent.id,
    parentName: trnSampleParent.name,
    statusId: trnSampleParent.statusId,
    datetime: trnSampleParent.datetime,
    childIdList: trnSampleParent.childIdList,
  });

  const { postEditSample } = usePostEditSample();
  const { postCreateSampleChild } = usePostCreateSampleChild(
    `/sample/edit/${trnSampleParent.id}/child/create`,
  );

  /**
   * 入力フォームを更新する
   * @param newValues
   */
  const handleFormChange = (newValues: Partial<Form>): void => {
    setForm({ ...form, ...newValues });
  };

  /**
   * キャンセルボタンのクリック時に元の画面に遷移する
   */
  const handleClickCancel = (): void => {
    navigate(-1);
  };

  /**
   * データ登録の成功時に実行する処理
   */
  const handleSuccess = (): void => {
    setForm({ ...defaultFormValue });
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
   * 親テーブルのデータを登録する
   */
  const handlePost = (): void => {
    const isConfirmed = confirm('親テーブルデータを保存しますか？');
    if (!isConfirmed) {
      return;
    }

    postEditSample({
      data: form,
      only: ['trn_sample_child_list'],
      handleSuccess: handleSuccess,
      handleError: handleError,
    });
  };

  return (
    <PageBase
      sx={{ padding: '16px 25%' }}
      hasPermission={authUserContext.hasPermission(Permission.EDIT_SAMPLE_DATA)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={'h1'}>編集機能のサンプル</Typography>
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

export default SampleEditPage;
