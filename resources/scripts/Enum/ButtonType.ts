export const ButtonType = {
  PRIMARY: 1,
  SECONDARY: 2,
  TERTIARY: 3,
} as const;

export type TButtonType = (typeof ButtonType)[keyof typeof ButtonType];
