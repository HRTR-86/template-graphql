import {
  Autocomplete,
  FormControl,
  FormHelperText,
  lighten,
  TextField,
  useTheme,
} from '@mui/material';
import Display from '@/scripts/Components/Display/Display';
import { memo } from 'react';
import { PropsBase } from '@/scripts/Common/System';
import { SelectItem } from '@/scripts/Components/Form/SelectBox';

interface Props extends PropsBase {
  valueList: number[];
  selectItemList: SelectItem[];
  handleChange: (value: any) => void;
}

const SelectMultiple = memo(
  ({
    sx,
    valueList,
    selectItemList,
    handleChange,
    errorMessageList = [],
  }: Props) => {
    const theme = useTheme();

    const isError = errorMessageList?.length > 0;

    const optionList: number[] = selectItemList.map((item) => item.value);

    const getLabel = (value: number) => {
      const item = selectItemList.find((item) => item.value === value);
      return item ? item.label : '';
    };

    return (
      <FormControl
        sx={{
          width: '300px',
          '& .MuiFormHelperText-root': {
            margin: '4px 0 0 0',
            lineHeight: '0.75rem',
            whiteSpace: 'break-spaces',
          },
          ...sx,
        }}
        error={isError}
      >
        <Autocomplete
          sx={{
            '& .MuiInputBase-root': {
              minHeight: '36px',
              padding: '2px',
              backgroundColor: isError
                ? lighten(theme.palette.error.main, 0.7)
                : theme.palette.base.main,
              '& .MuiAutocomplete-tag': {
                height: '28px',
                margin: '2px',
              },
              '& .MuiAutocomplete-input': {
                padding: '4px',
              },
            },
            ...sx,
          }}
          value={valueList}
          options={optionList}
          getOptionLabel={(id) => getLabel(id)}
          multiple={true}
          onChange={(_, value) => handleChange(value)}
          renderInput={(paramList) => <TextField {...paramList} />}
        />
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

export default SelectMultiple;
