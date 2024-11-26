import AddIcon from '@mui/icons-material/Add';
import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, IconButton, Typography } from '@mui/material';
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

  const [form, setForm] = useState<SampleChildCreateForm[]>([
    {
      name: '',
    },
  ]);

  const handleAdd = () => {
    setForm([...form, { name: '' }]);
  };

  /**
   * 入力フォームの更新
   * @param index
   * @param newValues
   */
  const handleChange = (
    index: number,
    newValues: Partial<SampleChildCreateForm>,
  ) => {
    const newFormValues = [...form] as SampleChildCreateForm[];
    newFormValues[index] = { ...newFormValues[index], ...newValues };
    setForm([...newFormValues]);
  };

  /**
   * データ登録の成功時に実行する処理
   */
  const handleSuccess = (): void => {
    setForm([{ name: '' }]);
    handleClose();
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
    postCreateSampleChild({
      data: {
        childList: form,
      },
      only: ['trn_sample_child_list'],
      handleSuccess: handleSuccess,
      handleError: handleError,
    });
  };

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
        {form.map((item, index) => {
          return (
            <InputField
              key={index}
              sx={{ margin: '8px 0 0 0' }}
              value={item.name}
              onChange={(name) => handleChange(index, { name })}
              errorMessageList={
                errorList !== undefined
                  ? errorList[`child_list.${index}.name`]
                  : []
              }
            />
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton>
          <AddIcon onClick={handleAdd} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          margin: '16px 0 0 0',
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
