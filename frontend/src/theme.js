import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#a7c5eb' : '#142451',
      light: mode === 'dark' ? '#c4d7ff' : '#264577',
      contrastText: mode === 'dark' ? '#12161d' : '#fff',
    },
    background: {
      default: mode === 'dark' ? '#12161d' : '#f4f6fb',
      paper: mode === 'dark' ? '#1e264e' : '#fff',
    },
    text: {
      primary: mode === 'dark' ? '#e1e8ff' : '#142451',
      secondary: mode === 'dark' ? '#bccfed' : '#3a516b',
    },
    error: {
      main: '#d32f2f',
    },
  },
});
