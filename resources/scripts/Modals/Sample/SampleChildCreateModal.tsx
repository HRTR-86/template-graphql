import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Typography } from '@mui/material';
import { Errors } from '@inertiajs/core/types/types';
import InputField from '@/scripts/Components/Form/InputField';
import { parseErrorProps } from '@/scripts/Parser/Common/parseErrorProps';
import { PostCreateSampleChildParameter } from '@/scripts/Hooks/Sample/usePostCreateSampleChild';
import { PropsBase } from '@/scripts/Common/System';
import { useErrorContext } from '@/scripts/Provider/ErrorProvider';
import { useState } from 'react';

interface SampleChildCreateForm {
  name: string;
}

interface Props extends PropsBase {
  isOpen: boolean;
  handleClose: () => void;
  postCreateSampleChild: (parameter: PostCreateSampleChildParameter) => void;
}

const SampleChildCreateModal = ({
  errorList,
  handleClose,
  postCreateSampleChild,
}: Props) => {
  const errorContext = useErrorContext();

  const [form, setForm] = useState<SampleChildCreateForm>({
    name: '',
  });

  /**
   * 入力フォームの更新
   * @param newValues
   */
  function handleChange(newValues: Partial<SampleChildCreateForm>) {
    setForm({ ...form, ...newValues });
  }

  /**
   * データ登録の成功時に実行する処理
   */
  function handleSuccess(): void {
    setForm({ name: '' });
    handleClose();
  }

  /**
   * データ登録の失敗時に実行する処理
   * @param errors
   */
  function handleError(errors: Errors): void {
    const { error } = parseErrorProps(errors);
    errorContext.handleChange(error);
  }

  /**
   * 子テーブルのデータを登録する
   */
  function handlePost(): void {
    postCreateSampleChild({
      data: form,
      only: ['trn_sample_child_list'],
      handleSuccess: handleSuccess,
      handleError: handleError,
    });
  }

  return (
    <>
      <Typography
        sx={{ fontSize: '18px' }}
        variant={'h1'}
      >
        子テーブルデータの追加
      </Typography>
      <Box sx={{ margin: '16px 0 0 0' }}>
        <Typography variant={'caption'}>子テーブルレコード名</Typography>
        <InputField
          value={form.name}
          onChange={(value) => handleChange({ name: value })}
          errorMessageList={errorList?.user_name ?? []}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          margin: '24px 0 0 0',
          justifyContent: 'flex-end',
        }}
      >
        <BasicButton
          sx={{
            width: '120px',
            margin: '0 0 0 8px',
          }}
          label={'保存する'}
          onClick={handlePost}
        />
      </Box>
    </>
  );
};

export default SampleChildCreateModal;
