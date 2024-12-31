import { Box, Stack, Typography } from '@mui/material';
import BasicButton from '@/scripts/Components/Button/BasicButton';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Errors } from '@inertiajs/core/types/types';
import PageBase from '@/scripts/Pages/PageBase';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { Permission } from '@/scripts/Enum/Mst/Permission';
import SampleCommonForm, {
  defaultFormValue,
  Form,
} from '@/scripts/Pages/Sample/SampleCommonForm';
import { useAuthUserContext } from '@/scripts/Provider/AuthUserProvider';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useNavigate, useParams } from 'react-router-dom';
import usePostEditSample from '@/scripts/Hooks/Sample/usePostEditSample';
import usePostCreateSampleChild from '@/scripts/Hooks/Sample/usePostCreateSampleChild';
import { useEffect, useState } from 'react';
import useFetchSampleEditInitial from '@/scripts/Hooks/Sample/useFetchSampleEditInitial';

const SampleEditPage = () => {
  const params = useParams();

  const { data } = useFetchSampleEditInitial(true, {
    parentId: Number(params?.parentId ?? 0),
  });

  const authUserContext = useAuthUserContext();
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    setForm({
      parentId: data.trnSampleParent.id,
      parentName: data.trnSampleParent.name,
      statusId: data.trnSampleParent.statusId,
      datetime: data.trnSampleParent.datetime,
      childIdList: data.trnSampleParent.childIdList,
    });
  }, [data.trnSampleParent]);

  const [form, setForm] = useState<Form>({
    parentId: data.trnSampleParent.id,
    parentName: data.trnSampleParent.name,
    statusId: data.trnSampleParent.statusId,
    datetime: data.trnSampleParent.datetime,
    childIdList: data.trnSampleParent.childIdList,
  });

  const { postEditSample } = usePostEditSample();
  const { postCreateSampleChild } = usePostCreateSampleChild(
    `/sample/edit/${data.trnSampleParent.id}/child/create`,
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
        trnSampleChildList={data.trnSampleChildList}
        errorList={data.errorList}
        handleFormChange={handleFormChange}
        postCreateSampleChild={postCreateSampleChild}
      />
    </PageBase>
  );
};

export default SampleEditPage;
