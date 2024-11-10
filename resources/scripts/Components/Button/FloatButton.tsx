import { Button, useTheme } from '@mui/material';
import { PropsBase } from '@/scripts/Common/System';

interface Color {
  text?: string;
  background?: string;
  hover?: string;
}

interface Props extends PropsBase {
  height?: string;
  color?: Color;
  startIcon?: any;
  label: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

const FloatButton = ({
  height = '44px',
  color,
  startIcon,
  label,
  disabled,
  href,
  onClick,
}: Props) => {
  const theme = useTheme();

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
        height: height,
        borderRadius: height,
        color: color?.text ?? theme.palette.object.main,
        backgroundColor: color?.background ?? theme.palette.base.main,
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: color?.hover ?? theme.palette.base.main,
        },
      }}
      startIcon={startIcon}
      disabled={disabled}
      href={href}
      onClick={handleOnClick}
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default FloatButton;
