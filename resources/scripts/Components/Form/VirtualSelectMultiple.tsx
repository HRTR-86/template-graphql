import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  lighten,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Children,
  cloneElement,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactElement,
} from 'react';
import Display from '@/scripts/Components/Display/Display';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { PropsBase } from '@/scripts/Common/System';
import { SelectItem } from '@/scripts/Components/Form/SelectBox';

interface Props extends PropsBase {
  valueList: number[];
  selectItemList: SelectItem[];
  handleChange: (value: any) => void;
}

const VirtualSelectMultiple = ({
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
        ListboxComponent={VirtualizedItemList}
      />
      <Display isDisplay={isError}>
        <FormHelperText>{errorMessageList?.join('\n')}</FormHelperText>
      </Display>
    </FormControl>
  );
};

const ITEM_HEIGHT = 30;
const MIN_ITEM_LENGTH = 10;

/**
 * 仮想の一覧
 */
const VirtualizedItemList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(({ children, ...other }, ref) => {
  const flattenedChildren = Children.toArray(children);

  return (
    <Box
      ref={ref}
      {...other}
    >
      <FixedSizeList
        height={
          flattenedChildren.length < MIN_ITEM_LENGTH
            ? flattenedChildren.length * ITEM_HEIGHT
            : MIN_ITEM_LENGTH * ITEM_HEIGHT
        }
        width={'100%'}
        itemSize={ITEM_HEIGHT}
        itemCount={flattenedChildren.length}
        outerRef={ref}
      >
        {({ index, style }: ListChildComponentProps) => {
          const element = flattenedChildren[index] as ReactElement<{
            style: CSSProperties;
            ref: ForwardedRef<HTMLDivElement>;
          }>;
          if (!isValidElement(element)) {
            return null;
          }

          return cloneElement(element, {
            style: { ...style },
            ref,
          });
        }}
      </FixedSizeList>
    </Box>
  );
});

export default VirtualSelectMultiple;
