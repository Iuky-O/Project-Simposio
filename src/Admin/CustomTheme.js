import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#471A3D', // Link e outros
    },
    secondary: {
      main: '#8e427d', // Top bar
    },
  },
  typography: {
    h6: {
      color: '#471A3D', // Cor personalizada para o título
    },
  },
});

export default customTheme;
