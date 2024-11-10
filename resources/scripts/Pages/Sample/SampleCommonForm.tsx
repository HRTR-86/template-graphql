import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Paper, Stack, styled, Typography, useTheme } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import { Dayjs } from 'dayjs';
import { FormTitle } from '@/scripts/Components/Display/FormTitle';
import InputDateWithTime from '@/scripts/Components/Form/InputDateWithTime';
import InputField from '@/scripts/Components/Form/InputField';
import { memo, useCallback, useMemo, useState } from 'react';
import Modal from '@/scripts/Components/Modal';
import { parseErrorMessageList } from '@/scripts/Validation/Validation';
import { PostCreateSampleChildParameter } from '@/scripts/Hooks/Sample/usePostCreateSampleChild';
import { PropsBase } from '@/scripts/Common/System';
import SampleChildCreateModal from '@/scripts/Modals/Sample/SampleChildCreateModal';
import SelectBox from '@/scripts/Components/Form/SelectBox';
import SelectMultiple from '@/scripts/Components/Form/SelectMultiple';
import useFetchSampleStatusList from '@/scripts/Hooks/Mst/useFetchSampleStatusList';

interface TrnSampleChild {
  id: number;
  name: string;
}

interface Props extends PropsBase {
  form: TSampleCommonForm;
  trnSampleChildList: TrnSampleChild[];
  handleFormChange: (newValues: Partial<TSampleCommonForm>) => void;
  postCreateSampleChild: (parameter: PostCreateSampleChildParameter) => void;
}

const StyledBoxForItem = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export interface TSampleCommonForm {
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

    const mstSampleStatusList = useMemo(
      () => mstSampleStatus.list(),
      [mstSampleStatus],
    );

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
            <Stack spacing={1}>
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
            <Stack spacing={1}>
              <FormTitle title={'ステータス'} />
              <SelectBox
                value={form.statusId}
                selectItemList={mstSampleStatusList}
                handleChange={(value) => handleFormChange({ statusId: value })}
                errorMessageList={errorList?.status_id ?? []}
              />
            </Stack>
            <Stack spacing={1}>
              <FormTitle title={'日時'} />
              <InputDateWithTime
                date={form.datetime}
                handleChange={(value) => handleFormChange({ datetime: value })}
                errorMessageList={errorList?.event_date ?? []}
              />
            </Stack>
            <Stack spacing={1}>
              <FormTitle title={'子テーブル'} />
              <StyledBoxForItem>
                <SelectMultiple
                  sx={{ width: '100%' }}
                  valueList={form.childIdList}
                  selectItemList={trnSampleChildList}
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
              </StyledBoxForItem>
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
