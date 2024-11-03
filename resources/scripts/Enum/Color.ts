export const Color = {
  MAIN: '#5689EC',
  ACCENT: '#5689EC',
  BASE: '#FFFFFF',
  OVERLAY: '#F5F5F5',
  OBJECT: '#31343e',
  OBJECT_SUB: '#818181',
  BORDER: '#EAEAEA',
  BORDER_STRONG: '#A4A4A4',
  SUCCESS: '#5b9f74',
  WARNING: '#E38C25',
  ERROR: '#D0576D',
} as const;

export type TColor = (typeof Color)[keyof typeof Color];
