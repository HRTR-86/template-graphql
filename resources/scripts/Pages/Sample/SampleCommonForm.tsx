import BasicButton from '@/scripts/Components/Button/BasicButton';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Dayjs } from 'dayjs';
import { FormTitle } from '@/scripts/Components/Display/FormTitle';
import InputDateWithTime from '@/scripts/Components/Form/InputDateWithTime';
import InputField from '@/scripts/Components/Form/InputField';
import { memo, useCallback, useState } from 'react';
import Modal from '@/scripts/Components/Modal';
import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { parseErrorMessageList } from '@/scripts/Validation/Validation';
import { PostCreateSampleChildParameter } from '@/scripts/Hooks/Sample/usePostCreateSampleChild';
import { PropsBase } from '@/scripts/Common/System';
import SampleChildCreateModal from '@/scripts/Modals/Sample/SampleChildCreateModal';
import useFetchSampleStatusList from '@/scripts/Hooks/Mst/useFetchSampleStatusList';
import useModelListToSelectItemList from '@/scripts/Hooks/Common/useConstantsToSelectItems';
import VirtualSelectBox from '@/scripts/Components/Form/VirtualSelectBox';
import VirtualSelectMultiple from '@/scripts/Components/Form/VirtualSelectMultiple';

interface TrnSampleChild {
  id: number;
  name: string;
}

interface Props extends PropsBase {
  form: Form;
  trnSampleChildList: TrnSampleChild[];
  handleFormChange: (newValues: Partial<Form>) => void;
  postCreateSampleChild: (parameter: PostCreateSampleChildParameter) => void;
}

export interface Form {
  parentId: number;
  parentName: string;
  statusId: number;
  datetime: Dayjs | null;
  childIdList: number[];
}

export const defaultFormValue = {
  parentId: 0,
  parentName: '',
  statusId: 0,
  datetime: null,
  childIdList: [],
};

const SampleCommonForm = memo(
  ({
    sx,
    form,
    trnSampleChildList,
    errorList,
    handleFormChange,
    postCreateSampleChild,
  }: Props) => {
    const theme = useTheme();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const mstSampleStatus = useFetchSampleStatusList();

    const { selectItemList: selectItemListByTrnSampleChild } =
      useModelListToSelectItemList(trnSampleChildList);
    const { selectItemList: selectItemListByMstSampleStatus } =
      useModelListToSelectItemList(mstSampleStatus.list());

    const handleCloseModal = useCallback(() => {
      setIsOpenModal(false);
    }, []);

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          onClose={handleCloseModal}
        >
          <SampleChildCreateModal
            isOpen={isOpenModal}
            errorList={errorList}
            handleClose={() => setIsOpenModal(false)}
            postCreateSampleChild={postCreateSampleChild}
          />
        </Modal>
        <Paper
          sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            ...sx,
          }}
        >
          <Stack spacing={2}>
            <Typography
              sx={{
                padding: '0 0 0 8px',
                borderLeft: `8px solid ${theme.palette.main.main}`,
              }}
              variant={'h2'}
            >
              親テーブルの情報
            </Typography>
            <Stack spacing={0.5}>
              <FormTitle
                title={'親テーブルレコード名'}
                isRequired={true}
              />
              <InputField
                value={form.parentName}
                onChange={(value) => handleFormChange({ parentName: value })}
                errorMessageList={errorList?.parent_name ?? []}
              />
            </Stack>
            <Stack spacing={0.5}>
              <FormTitle title={'ステータス'} />
              <VirtualSelectBox
                value={form.statusId}
                selectItemList={selectItemListByMstSampleStatus}
                handleChange={(value) => handleFormChange({ statusId: value })}
                errorMessageList={errorList?.status_id ?? []}
              />
            </Stack>
            <Stack spacing={0.5}>
              <FormTitle title={'日時'} />
              <InputDateWithTime
                date={form.datetime}
                handleChange={(value) => handleFormChange({ datetime: value })}
                errorMessageList={errorList?.event_date ?? []}
              />
            </Stack>
            <Stack spacing={0.5}>
              <FormTitle title={'子テーブル'} />
              <Stack
                spacing={0.5}
                direction={'row'}
              >
                <VirtualSelectMultiple
                  sx={{ width: '100%' }}
                  valueList={form.childIdList}
                  selectItemList={selectItemListByTrnSampleChild}
                  handleChange={(valueList) =>
                    handleFormChange({ childIdList: valueList })
                  }
                  errorMessageList={parseErrorMessageList(
                    errorList,
                    'guest_of_honor_id_list',
                    form.childIdList.length,
                  )}
                />
                <BasicButton
                  sx={{
                    width: '280px',
                    margin: '0 0 0 8px',
                  }}
                  label={'子テーブルデータの追加'}
                  type={ButtonType.SECONDARY}
                  onClick={() => setIsOpenModal(true)}
                />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default SampleCommonForm;
