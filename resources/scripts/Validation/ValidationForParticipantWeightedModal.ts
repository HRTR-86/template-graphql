import { ValidationRule } from '@/scripts/Enum/ValidationRule';
import {
  validateBase,
  ValidationData,
  ValidationResult,
} from '@/scripts/Validation/Validation';

export interface ValidationErrorListForPaymentUpdateModal {
  totalWeighted?: string[];
}

interface ValidationResultForPaymentUpdateModal extends ValidationResult {
  errorList: ValidationErrorListForPaymentUpdateModal;
}

export const validate = (
  data: ValidationData,
): ValidationResultForPaymentUpdateModal => {
  const ruleList = {
    totalWeighted: [ValidationRule.NOT_ZERO],
  };

  const labelList = {
    totalWeighted: '傾斜の合計',
  };

  const errorList = validateBase(data, ruleList, labelList);

  return {
    errorList: errorList,
    hasError: Object.keys(errorList).length > 0,
  };
};
