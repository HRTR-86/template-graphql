import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { memo } from 'react';
import { PropsBase } from '@/scripts/Common/System';
import 'dayjs/locale/ja';
import { lighten, useTheme } from '@mui/material';

interface Props extends PropsBase {
  time: Dayjs | null;
  handleChange: (newValues: any) => void;
  disabled?: boolean;
  height?: string;
  width?: string;
  format?: string;
}

const InputTime = memo(
  ({
    sx,
    time,
    handleChange,
    disabled = false,
    errorMessageList = [],
    height = '36px',
    width = '96px',
    format = 'HH:mm',
  }: Props) => {
    const theme = useTheme();

    const isError = errorMessageList?.length > 0;

    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={'ja'}
      >
        <TimePicker
          sx={{
            width: width,
            '&.MuiFormControl-root': {
              '& .MuiInputBase-root': {
                height: height,
                backgroundColor: isError
                  ? lighten(theme.palette.error.main, 0.7)
                  : theme.palette.base.main,
                '& .MuiInputBase-input': {
                  boxSizing: 'border-box',
                  fontSize: '14px',
                },
                '& .MuiInputAdornment-root': {
                  margin: '0',
                  '& .MuiButtonBase-root': {
                    padding: '0 4px 0 0',
                    color: isError
                      ? theme.palette.error.main
                      : theme.palette['object-sub'].main,
                  },
                },
              },
              '& .MuiFormHelperText-root': {
                margin: '4px 0 0 0',
                lineHeight: '0.75rem',
                whiteSpace: 'break-spaces',
              },
            },
            ...sx,
          }}
          value={time}
          format={format}
          onChange={handleChange}
          disabled={disabled}
          ampm={false}
          slotProps={{
            textField: {
              error: isError,
              helperText: isError ? errorMessageList?.join('\n') : '',
            },
          }}
        />
      </LocalizationProvider>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default InputTime;
