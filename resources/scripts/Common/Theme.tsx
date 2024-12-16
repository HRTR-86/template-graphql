import { Color } from '@/scripts/Enum/Color';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    main: {
      main: Color.MAIN,
    },
    accent: {
      main: Color.ACCENT,
    },
    base: {
      main: Color.BASE,
    },
    overlay: {
      main: Color.OVERLAY,
    },
    object: {
      main: Color.OBJECT,
    },
    'object-sub': {
      main: Color.OBJECT_SUB,
    },
    border: {
      main: Color.BORDER,
    },
    'border-strong': {
      main: Color.BORDER_STRONG,
    },
    success: {
      main: Color.SUCCESS,
    },
    warning: {
      main: Color.WARNING,
    },
    error: {
      main: Color.ERROR,
    },
  },
  typography: {
    h1: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '16px',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '14px',
      fontWeight: 400,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
    },
    fontFamily: ['"Noto Sans JP"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: 'object.main',
        whiteSpace: 'break-spaces',
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    main: {
      main: string;
    };
    base: {
      main: string;
    };
    overlay: {
      main: string;
    };
    object: {
      main: string;
    };
    'object-sub': {
      main: string;
    };
    border: {
      main: string;
    };
    'border-strong': {
      main: string;
    };
  }

  interface PaletteOptions {
    main?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
    base?: PaletteOptions['primary'];
    overlay?: PaletteOptions['primary'];
    object?: PaletteOptions['primary'];
    'object-sub'?: PaletteOptions['primary'];
    border?: PaletteOptions['primary'];
    'border-strong'?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    base: true;
  }
}

declare module '@mui/material/Button/Button' {
  interface ButtonPropsColorOverrides {
    main: true;
    accent: true;
    base: true;
    object: true;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    base: true;
  }
}
