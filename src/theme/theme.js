// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#061242ce',
    },
    secondary: {
      main: '#9bbfffef',
    },
    success:{
      main: '#5bfdf299',
    },
    error:{
      main: '#fa0909c8'
    },
    background: {
      default: '#020e1ad3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    // Override default styles here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
