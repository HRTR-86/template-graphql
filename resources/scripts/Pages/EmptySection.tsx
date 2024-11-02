import BasicButton from '@/scripts/Components/Button/BasicButton';
import { Box, Typography } from '@mui/material';
import { ButtonType } from '@/scripts/Enum/ButtonType';
import Display from '@/scripts/Components/Display/Display';
import { JSX } from 'react';
import { PropsBase } from '@/scripts/Common/System';

export interface EmptyProps {
  message: string;
  label: string;
  onClose: () => void;
  children?: JSX.Element;
}

interface Props extends PropsBase {
  emptyProps: EmptyProps;
}

const EmptySection = ({ sx, emptyProps }: Props) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 56px)',
        boxSizing: 'border-box',
        margin: '-56px 0 0 0',
        padding: '16px 30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        ...sx,
      }}
      component={'article'}
    >
      <Display isDisplay={emptyProps.children !== undefined}>
        {emptyProps.children}
      </Display>
      <Typography variant={'h1'}>{emptyProps.message}</Typography>
      <BasicButton
        sx={{ width: '240px' }}
        type={ButtonType.TERTIARY}
        label={emptyProps.label}
        onClick={emptyProps.onClose}
      />
    </Box>
  );
};

export default EmptySection;
