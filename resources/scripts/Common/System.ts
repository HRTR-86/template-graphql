import { ReactNode } from 'react';
import { SxProps } from '@mui/material';

export interface ErrorList {
  [key: string]: string[];
}

export interface PropsBase {
  children?: ReactNode;
  sx?: SxProps;
  errorList?: ErrorList;
  errorMessageList?: string[];
}
