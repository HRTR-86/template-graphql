import {
  Box,
  FormControl,
  FormHelperText,
  lighten,
  MenuItem,
  Select,
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

export interface VirtualSelectItem {
  name: string;
  id: string;
}

interface Props extends PropsBase {
  value: number;
  selectItemList: VirtualSelectItem[];
  disabled?: boolean;
  handleChange: (value: any) => void;
}

const VirtualSelectBox = ({
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
        MenuProps={{
          PaperProps: {
            sx: {
              '.MuiList-root': {
                '> div': {
                  position: 'relative',
                },
              },
            },
          },
          MenuListProps: {
            component: VirtualizedItemList,
          },
        }}
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
        {selectItemList?.map((item: VirtualSelectItem) => {
          return (
            <MenuItem
              key={item.id}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
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

export default VirtualSelectBox;
