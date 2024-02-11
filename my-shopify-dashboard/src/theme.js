// src/theme.js
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#131439', // Dark blue shade for the background
        paper: '#131439', // Slightly lighter dark blue for elements like Cards, Dialogs
      },
      primary: {
        main: '#0077B6', // A shade of blue for primary buttons and icons
      },
      secondary: {
        main: '#131439', // A contrasting secondary color
      },
      text: {
        primary: '#E0E0E0', // Light grey for primary text for better readability
        secondary: '#A0AEC0', // Slightly darker grey for secondary text
      },
      // Adjusting action colors for things like button hover states
      action: {
        active: '#E0E0E0',
        hover: '#0077B6',
        selected: '#00B4D8',
        disabled: '#A0AEC0',
        disabledBackground: '#112240',
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
            backgroundColor: '#112240', // AppBar color
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#0A1929', // Drawer background
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



