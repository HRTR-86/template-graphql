import { Box, Paper, styled } from '@mui/material';
import { FormTitle } from '@/scripts/Components/Display/FormTitle';
import InputField from '@/scripts/Components/Form/InputField';
import { PropsBase } from '@/scripts/Common/System';
import SelectBox from '@/scripts/Components/Form/SelectBox';
import useFetchRoleList from '@/scripts/Hooks/Mst/useFetchRoleList';
import { memo } from 'react';

const StyledBoxForSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const StyledBoxForGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export interface TProfileForm {
  userName: string;
  roleId: number;
}

interface Props extends PropsBase {
  form: TProfileForm;
  handleFormChange: (newValues: Partial<TProfileForm>) => void;
}

const ProfileForm = memo(
  ({ sx, form, errorList, handleFormChange }: Props) => {
    const mstRole = useFetchRoleList();
    const mstRoleList = mstRole.list();

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
        <StyledBoxForSection>
          <StyledBoxForGroup>
            <FormTitle
              title={'氏名'}
              isRequired={true}
            />
            <InputField
              value={form.userName}
              onChange={(value) => handleFormChange({ userName: value })}
              errorMessageList={errorList?.user_name ?? []}
            />
          </StyledBoxForGroup>
          <StyledBoxForGroup>
            <FormTitle title={'権限'} />
            <SelectBox
              value={form.roleId}
              list={mstRoleList}
              handleChange={(value) => handleFormChange({ roleId: value })}
              errorMessageList={errorList?.role_id ?? []}
            />
          </StyledBoxForGroup>
        </StyledBoxForSection>
      </Paper>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default ProfileForm;
