import { lighten, TextField, useTheme } from '@mui/material';
import { PropsBase } from '@/scripts/Common/System';

type InputType = 'text' | 'password' | 'number';

interface IProps extends PropsBase {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  rows?: number;
  autoComplete?: string;
  height?: string;
  width?: string;
  fullWidth?: boolean;
  innerSx?: object;
  disabled?: boolean;
}

const TextArea = ({
  sx,
  value,
  onChange,
  placeholder,
  type = 'text',
  rows = 2,
  autoComplete = 'off',
  width = '100%',
  fullWidth = false,
  disabled = false,
  errorMessageList = [],
}: IProps) => {
  const theme = useTheme();

  const isError = errorMessageList?.length > 0;

  return (
    <TextField
      sx={{
        width: width,
        '&.MuiFormControl-root': {
          '& .MuiInputBase-root': {
            padding: '0',
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
          padding: '4px 8px',
          fontSize: '14px',
        },
      }}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      multiline={true}
      rows={rows}
      fullWidth={fullWidth}
      disabled={disabled}
      error={isError}
      helperText={isError ? errorMessageList?.join('\n') : ''}
    />
  );
};

export default TextArea;
