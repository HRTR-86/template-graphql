import { ErrorList } from '@/scripts/Common/System';
import { parseErrors } from '@/scripts/Validation/Validation';

export interface TrnUserRole {
  roleId: number;
  isCurrent: boolean;
}

interface Flash {
  message: string;
}

interface OutputHomeProps {
  trnUserRole: TrnUserRole;
  trnUserRoleList: TrnUserRole[];
  flash: Flash;
  errorList: ErrorList;
}

export const parseProfileProps = (props: any): OutputHomeProps => {
  return {
    trnUserRole: {
      roleId: props?.trn_user_role?.role_id ?? 0,
      isCurrent: false,
    },
    trnUserRoleList:
      props?.trn_user_role_list.map((trnUserRole: any) => ({
        roleId: trnUserRole.role_id,
        isCurrent: trnUserRole.is_current,
      })) ?? [],
    flash: {
      message: props?.flash?.message ?? '',
    },
    errorList: parseErrors(props?.errors),
  };
};
