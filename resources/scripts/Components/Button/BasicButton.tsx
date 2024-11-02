import { Button, lighten, useTheme } from '@mui/material';
import { ButtonType, TButtonType } from '@/scripts/Enum/ButtonType';
import { PropsBase } from '@/scripts/Common/System';
import { useMemo } from 'react';

interface Props extends PropsBase {
  type?: TButtonType;
  startIcon?: any;
  label: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

const BasicButton = ({
  sx,
  type = ButtonType.PRIMARY,
  startIcon,
  label,
  disabled,
  href,
  onClick,
}: Props) => {
  const theme = useTheme();

  /**
   * ボタンの背景色を取得する
   */
  const backgroundColor = useMemo(() => {
    switch (type) {
      case ButtonType.PRIMARY:
        return theme.palette.main.main;
      case ButtonType.SECONDARY:
        return theme.palette.object.main;
      case ButtonType.TERTIARY:
        return theme.palette.base.main;
    }
  }, [type]);

  /**
   * ボタンの文字色を取得する
   */
  const textColor = useMemo(() => {
    switch (type) {
      case ButtonType.PRIMARY:
        return 'base';
      case ButtonType.SECONDARY:
        return 'base';
      case ButtonType.TERTIARY:
        return 'main';
    }
  }, [type]);

  /**
   * ボタンクリック時に処理を実行する
   */
  const handleOnClick = (): void => {
    if (href !== undefined) {
      const currentHref = window.location.href;
      const url = new URL(currentHref);
      sessionStorage.setItem('previous', url.pathname);
      return;
    }

    onClick?.();
  };

  return (
    <Button
      sx={{
        height: '36px',
        boxSizing: 'border-box',
        backgroundColor: backgroundColor,
        textTransform: 'none',
        '&.Mui-disabled': {
          backgroundColor: lighten(backgroundColor, 0.3),
        },
        '&:hover': {
          backgroundColor: lighten(backgroundColor, 0.3),
        },
        ...sx,
      }}
      variant="outlined"
      color={textColor}
      startIcon={startIcon}
      href={href}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {label}
    </Button>
  );
};

export default BasicButton;
