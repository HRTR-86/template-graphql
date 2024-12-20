import { Box, Paper, Stack } from '@mui/material';
import { FormTitle } from '@/scripts/Components/Display/FormTitle';
import InputField from '@/scripts/Components/Form/InputField';
import { memo, useMemo } from 'react';
import { PropsBase } from '@/scripts/Common/System';
import SelectBox from '@/scripts/Components/Form/SelectBox';
import { TrnUserRole } from '@/scripts/Parser/Profile/parseProfileProps';
import useFetchRoleList from '@/scripts/Hooks/Mst/useFetchRoleList';
import useModelListToSelectItemList from '@/scripts/Hooks/Common/useConstantsToSelectItems';

export interface Form {
  userName: string;
  roleId: number;
}

interface Props extends PropsBase {
  form: Form;
  trnUserRoleList: TrnUserRole[];
  handleFormChange: (newValues: Partial<Form>) => void;
}

const ProfileForm = memo(
  ({ sx, form, trnUserRoleList, errorList, handleFormChange }: Props) => {
    const mstRole = useFetchRoleList();

    const mstRoleList = useMemo(() => {
      const roleIdList = trnUserRoleList.map(
        (trnUserRole) => trnUserRole.roleId,
      );
      return mstRole
        .list()
        .filter((mstRole) => roleIdList.includes(mstRole.id));
    }, [mstRole.list(), trnUserRoleList]);

    const { selectItemList: selectItemListByMstRole } =
      useModelListToSelectItemList(mstRoleList);

    return (
      <Paper
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          ...sx,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Stack spacing={0.5}>
            <FormTitle
              title={'氏名'}
              isRequired={true}
            />
            <InputField
              value={form.userName}
              onChange={(value) => handleFormChange({ userName: value })}
              errorMessageList={errorList?.user_name ?? []}
            />
          </Stack>
          <Stack spacing={0.5}>
            <FormTitle title={'権限'} />
            <SelectBox
              value={form.roleId}
              selectItemList={selectItemListByMstRole}
              handleChange={(value) => handleFormChange({ roleId: value })}
              errorMessageList={errorList?.role_id ?? []}
            />
          </Stack>
        </Box>
      </Paper>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default ProfileForm;
