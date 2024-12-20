import Display from '@/scripts/Components/Display/Display';
import {
  FormControl,
  FormHelperText,
  lighten,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import { memo } from 'react';
import { PropsBase } from '@/scripts/Common/System';

export interface SelectItem {
  value: number;
  label: string;
}

interface Props extends PropsBase {
  value: number;
  selectItemList: SelectItem[];
  disabled?: boolean;
  handleChange: (value: any) => void;
}

const SelectBox = memo(
  ({
    sx,
    value,
    selectItemList,
    disabled,
    handleChange,
    errorMessageList = [],
  }: Props) => {
    const theme = useTheme();

    const isError = errorMessageList?.length > 0;

    return (
      <FormControl
        sx={{
          '& .MuiFormHelperText-root': {
            margin: '4px 0 0 0',
            lineHeight: '0.75rem',
            whiteSpace: 'break-spaces',
          },
        }}
        error={isError}
      >
        <Select
          sx={{
            height: '36px',
            backgroundColor: isError
              ? lighten(theme.palette.error.main, 0.7)
              : theme.palette.base.main,
            ...sx,
          }}
          inputProps={{
            sx: {
              fontSize: '14px',
            },
          }}
          value={selectItemList.length > 0 ? value : 0}
          disabled={disabled}
          variant={'outlined'}
          onChange={(event) => handleChange(event.target.value)}
          error={isError}
        >
          {
            <MenuItem
              key={0}
              value={0}
            >
              {'ー 値を選択してください ー'}
            </MenuItem>
          }
          {selectItemList?.map((item: SelectItem) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
        <Display isDisplay={isError}>
          <FormHelperText>{errorMessageList?.join('\n')}</FormHelperText>
        </Display>
      </FormControl>
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  },
);

export default SelectBox;
