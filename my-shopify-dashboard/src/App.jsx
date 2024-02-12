import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
// import darkTheme from './theme'
// Create a dark theme.
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#070e16', // Dark blue shade for the background
        paper: '#0d182a', // Slightly lighter dark blue for elements like Cards, Dialogs
      },
      primary: {
        main: '#0d182a', // A shade of blue for primary buttons and icons
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
            backgroundColor: '#0d182a', // Drawer background
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

const queryClient = new QueryClient();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI Application
      </Typography>
      <List>
        <ListItem button key="Dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* Add more navigation items here */}
      </List>
    </Box>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
          >
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
          >
            <Toolbar /> {/* Necessary for content to be below AppBar */}
            <Dashboard />
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
