import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import { 
  ThemeProvider, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography,
  Drawer, 
  List, ListItemButton,ListItemIcon, ListItemText, 
  IconButton,
  Box, 
  Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront'; 
import { darkTheme } from './Styles/theme';

const queryClient = new QueryClient();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  
      <Toolbar />
      <List>
        {/* <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
            Shopidex
        </Typography> */}
        <ListItemButton key="Dashboard" onClick={(event) => {
          event.stopPropagation();
          navigate('/')
        }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton key="Products" onClick={(event) => { 
          event.stopPropagation();
          navigate('/products')
        }}>
        <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar 
            position="fixed" 
            sx={{ 
              zIndex: (theme) => theme.zIndex.drawer + 1, 
              background: "#070e16"
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Shopidex
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}
          >
            <Hidden mdUp implementation="css">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown mdDown implementation="css">
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', md: 'block' },
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
            sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 240px)` } }}
          >
            <Toolbar /> {/* Acts as a space bar */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              {/* Define other routes as needed */}
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>

  );
}

export default App;
