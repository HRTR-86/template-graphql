export const ValidationRule = {
  NOT_ZERO: 'not_zero',
} as const;

export type TValidationRule =
  (typeof ValidationRule)[keyof typeof ValidationRule];
