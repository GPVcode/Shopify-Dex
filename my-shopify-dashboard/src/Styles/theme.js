// src/theme.js
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#070e16',
      paper: '#0d182a',
    },
    primary: {
      main: '#070e16', // A shade of blue for primary buttons and icons
    },
    secondary: {
      main: '#00B4D8', // A contrasting secondary color test
    },
    text: {
      primary: '#ececec', // Light grey for primary text for better readability
      secondary: '#A0AEC0', // Slightly darker grey for secondary text
    },
    // Adjusting action colors for things like button hover states
    action: {
      active: '#E0E0E0',
      hover: '#0077B6',
      selected: '#00B4D8',
      disabled: '#A0AEC0',
      disabledBackground: '#0d182a',
    },
  },
  components: {
    // Customizing components globally
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Ensuring button text is white for contrast
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#0d182a', // AppBar color
        },
        
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#070e16', // Drawer background
        },
      },
    },
    // Other component overrides can go here
  },
  typography: {
    // Adjust typography colors if needed
    allVariants: {
      color: '#E0E0E0',
    },
  },
});



