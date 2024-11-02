import { ErrorList } from '@/scripts/Common/System';
import { parseErrors } from '@/scripts/Validation/Validation';

export interface TrnUserRole {
  role_id: number;
}

interface Flash {
  message: string;
}

interface OutputHomeProps {
  trnUserRole: TrnUserRole;
  flash: Flash;
  errorList: ErrorList;
}

export const parseProfileProps = (props: any): OutputHomeProps => {
  return {
    trnUserRole: {
      role_id: props?.trn_user_role?.role_id ?? 0,
    },
    flash: {
      message: props?.flash?.message ?? '',
    },
    errorList: parseErrors(props?.errors),
  };
};
