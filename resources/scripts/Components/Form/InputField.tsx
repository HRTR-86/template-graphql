import equal from 'fast-deep-equal/react';
import { memo } from 'react';
import { lighten, TextField, useTheme } from '@mui/material';
import { PropsBase } from '@/scripts/Common/System';

type InputType = 'text' | 'password' | 'number';

interface Props extends PropsBase {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  autoComplete?: string;
  height?: string;
  width?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const InputField = memo(
  ({
    sx,
    value,
    onChange,
    placeholder = '',
    type = 'text',
    autoComplete = 'off',
    height = '36px',
    width = '100%',
    fullWidth = false,
    disabled = false,
    errorMessageList = [],
  }: Props) => {
    const theme = useTheme();

    const isError = errorMessageList?.length > 0;

    return (
      <TextField
        sx={{
          width: width,
          '&.MuiFormControl-root': {
            '& .MuiInputBase-root': {
              backgroundColor: isError
                ? lighten(theme.palette.error.main, 0.7)
                : theme.palette.base.main,
            },
            '& .MuiFormHelperText-root': {
              margin: '4px 0 0 0',
              lineHeight: '0.75rem',
              whiteSpace: 'break-spaces',
            },
          },
          ...sx,
        }}
        inputProps={{
          sx: {
            height: height,
            padding: '4px 8px',
            boxSizing: 'border-box',
            fontSize: '14px',
          },
        }}
        value={value}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        fullWidth={fullWidth}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        error={isError}
        helperText={isError ? errorMessageList?.join('\n') : ''}
      />
    );
  },
  (prevProps, nextProps) => equal(prevProps, nextProps),
);

export default InputField;
