// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#7850e7ec',
    },
    secondary: {
      main: '#6891d3c9',
    },
    success:{
      main: '#5bfdf299',
    },
    error:{
      main: '#fa0909c8'
    },
    background: {
      default: '#cfe6fdd7',
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
