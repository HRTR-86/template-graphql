import { Box, Typography, useTheme } from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import { PropsBase } from '@/scripts/Common/System';

interface IProps extends PropsBase {
  title: string;
  isRequired?: boolean;
}

export const FormTitle = ({ sx, title, isRequired = false }: IProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <Typography variant={'subtitle1'}>{title}</Typography>
      <Display isDisplay={isRequired}>
        <Box
          sx={{
            margin: '0 0 0 8px',
            padding: '0 8px',
            lineHeight: '24px',
            borderRadius: '4px',
            color: theme.palette.base.main,
            backgroundColor: theme.palette.error.main,
            fontSize: '12px',
          }}
        >
          必須
        </Box>
      </Display>
    </Box>
  );
};
