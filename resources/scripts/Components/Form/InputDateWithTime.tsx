import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { memo } from 'react';
import { PropsBase } from '@/scripts/Common/System';
import 'dayjs/locale/ja';
import { lighten, useTheme } from '@mui/material';

interface Props extends PropsBase {
  date: Dayjs | null;
  handleChange: (newValues: any) => void;
  disabled?: boolean;
  height?: string;
  width?: string;
  format?: string;
}

const InputDateWithTime = memo(
  ({
    sx,
    date,
    handleChange,
    disabled = false,
    errorMessageList = [],
    height = '36px',
    width = '180px',
    format = 'YYYY/MM/DD HH:mm',
  }: Props) => {
    const theme = useTheme();

    const isError = errorMessageList?.length > 0;

    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={'ja'}
      >
        <DateTimePicker
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
          value={date}
          format={format}
          onChange={handleChange}
          disabled={disabled}
          slotProps={{
            calendarHeader: {
              format: 'YYYY/MM',
            },
            textField: {
              error: isError,
              helperText: isError ? errorMessageList?.join('\n') : '',
            },
          }}
          ampm={false}
        />
      </LocalizationProvider>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default InputDateWithTime;
