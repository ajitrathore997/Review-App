import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0055FF',
    },
    secondary: {
      main: '#F5F5F5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
});

export default theme;