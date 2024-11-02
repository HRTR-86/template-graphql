import { TValidationRule, ValidationRule } from '@/scripts/Enum/ValidationRule';
import { ErrorList } from '@/scripts/Common/System';

export interface ValidationData {
  [key: string]: any;
}

export interface ValidationLabelList {
  [key: string]: string;
}

export interface ValidationRuleList {
  [key: string]: TValidationRule[];
}

interface ValidationErrorList {
  [key: string]: string[];
}

export interface ValidationResult {
  // errorList: ValidationErrorList;
  hasError: boolean;
}

/**
 * バリデーションを実行する
 * @param data
 * @param ruleList
 * @param labelList
 */
export const validateBase = (
  data: ValidationData,
  ruleList: ValidationRuleList,
  labelList: ValidationLabelList,
) => {
  const errorList: ValidationErrorList = {};

  Object.keys(data).forEach((key) => {
    const result = validate(data[key], ruleList[key], labelList[key]);
    if (result.length > 0) {
      errorList[key] = result;
    }
  });

  return errorList;
};

/**
 * 項目ごとにバリデーションを実行する
 * @param value
 * @param targetRuleList
 * @param label
 */
const validate = (
  value: any,
  targetRuleList: TValidationRule[],
  label: string,
): string[] => {
  const error: string[] = [];

  targetRuleList.forEach((rule: TValidationRule) => {
    let errorMessage = '';
    switch (rule) {
      case ValidationRule.NOT_ZERO:
        errorMessage = validateForNotZero(value, label);
        break;
    }

    if (errorMessage !== '') {
      error.push(errorMessage);
    }
  });

  return error;
};

/**
 * 0以外の値かチェックする
 * @param value
 * @param label
 */
const validateForNotZero = (value: any, label: string): string => {
  if (value === 0) {
    return `${label}は0以外の値を指定してください`;
  }

  return '';
};

/**
 * サーバーから取得したバリデーションのエラーメッセージをパースする
 * @param errors
 */
export const parseErrors = (errors: any): ValidationErrorList => {
  return Object.entries(errors).reduce(
    (accumulator: ErrorList, [key, value]) => {
      if (key !== 'error') {
        accumulator[key] = value as string[];
      }

      return accumulator;
    },
    {},
  );
};

/**
 * サーバーから取得したバリデーションのエラーメッセージ（配列形式）をパースする
 * @param errorList
 * @param key
 * @param targetLength
 */
export const parseErrorMessageList = (
  errorList: any,
  key: string,
  targetLength: number,
): string[] => {
  const keyList = Object.keys(errorList);
  if (keyList.length === 0) {
    return [];
  }

  const errorMessageList: string[] = [];

  for (let index = 0; index < targetLength; index++) {
    const targetKey = `${key}.${index}`;
    const targetErrorMessageList = errorList[targetKey];

    if (!targetErrorMessageList) {
      continue;
    }

    for (const targetErrorMessage of targetErrorMessageList) {
      if (!errorMessageList.includes(targetErrorMessage)) {
        errorMessageList.push(targetErrorMessage);
      }
    }
  }

  return errorMessageList;
};
