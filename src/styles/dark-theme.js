import { createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6200ea',
      },
      secondary: {
        main: '#03dac6',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#bdbdbd',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#2a2a2a',
            borderRadius: 4,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderColor: '#444',
            },
            '&:hover fieldset': {
              borderColor: '#6200ea',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6200ea',
            },
          },
          input: {
            color: '#ffffff',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#bdbdbd',
          },
        },
      },
    },
  });
  

export default darkTheme;