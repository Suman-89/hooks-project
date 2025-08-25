// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#509ce7ec',
    },
    secondary: {
      main: '#350035f3',
    },
    success:{
      main: '#5bfd8cee',
    },
    error:{
      main: '#fa0909b0'
    },
    background: {
      default: '#f4f6f8',
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
