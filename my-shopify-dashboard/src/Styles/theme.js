import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d0f0f', // Apple dark mode background
      paper: '#0d0f0f', // Slightly lighter for elements like cards, dialogs
    },
    primary: {
      main: '#0A84FF', // Apple uses vibrant blues for primary actions in dark mode
    },
    secondary: {
      main: '#30D158', // Green for secondary actions, inspired by iOS system colors
    },
    text: {
      primary: '#FFFFFF', // White text for maximum contrast
      secondary: '#E5E5EA', // A lighter grey for less emphasis
    },
    action: {
      active: '#E5E5EA',
      hover: '#232f3e', 
      selected: '#0A84FF', // Using the primary blue for selection as well
      disabled: '#3A3A3C',
      disabledBackground: '#2C2C2E', // Keeping disabled elements discernible
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Ensure button text is white for contrast
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d0f0f', // Keeping consistent with paper backgrounds
        },
      },
    },
    // Any other component overrides for customization
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
    },
  },
});
