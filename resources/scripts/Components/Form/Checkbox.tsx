import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  useTheme,
} from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import { PropsBase } from '@/scripts/Common/System';

interface Props extends PropsBase {
  label?: string;
  value: boolean;
  disabled?: boolean;
  handleChange: (newValues: any) => void;
}

const Checkbox = ({
  sx,
  label = '',
  value,
  disabled = false,
  errorMessageList = [],
  handleChange,
}: Props) => {
  const theme = useTheme();

  const isError = errorMessageList?.length > 0;

  return (
    <FormControl
      sx={{
        ...sx,
      }}
      error={isError}
    >
      <FormControlLabel
        sx={{
          margin: '0',
          '.MuiTypography-root': {
            color: theme.palette.object.main,
            fontSize: '14px',
          },
        }}
        control={
          <MuiCheckbox
            checked={value}
            disabled={disabled}
            onChange={handleChange}
          />
        }
        label={label}
      />
      <Display isDisplay={isError}>
        <FormHelperText>{errorMessageList?.join('\n')}</FormHelperText>
      </Display>
    </FormControl>
  );
};

export default Checkbox;
