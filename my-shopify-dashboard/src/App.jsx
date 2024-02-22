import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
import {
  ThemeProvider,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Fab,
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { darkTheme } from './Styles/theme';
import ShopidexLogo from './Styles/logo/Shopidex Logo.png'

const queryClient = new QueryClient();

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const drawerWidthExpanded = 200;
  const drawerWidthCollapsed = 72;

  const drawerContent = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          py: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            
            justifyContent: 'center',
            p: 2,
            width: '100%',
          }}
        >
          <img 
            src={ShopidexLogo} 
            alt="Shopidex Logo" 
            style={{ 
              height: isSidebarExpanded ? '3rem' : '32px', 
              width: isSidebarExpanded ? '3rem' : '32px',
              my: 1
            }} 
          />
          {isSidebarExpanded && <Typography variant="h6" noWrap sx={{ marginLeft: 1 }}>Shopidex</Typography>}
        </Box>

        <List sx={{ width: '100%', mt: 2 }}>
          {['Dashboard', 'Products'].map((text, index) => (
            <ListItemButton 
              key={text}
              sx={{
                justifyContent: 'center',
                my: 0.5,
              }}
              onClick={() => navigate(index === 0 ? '/' : '/products')}
            >
              <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                {index === 0 ? <DashboardIcon /> : <StorefrontIcon />}
              </ListItemIcon>
              {isSidebarExpanded && <ListItemText primary={text} sx={{marginLeft: 1}}/>}
            </ListItemButton>
          ))}
        </List>
      </Box>
  );
  

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Box sx={{ display: 'flex', position: 'relative', }}>

          <Drawer
            variant="permanent"
            sx={{
              width: isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
                boxSizing: 'border-box',
                background: "#070e16",
                overflowX: 'hidden',
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>

          <Fab
            color="primary"
            sx={{
              position: 'fixed', // Changed from 'absolute' to 'fixed'
              top: "50%",
              left: isSidebarExpanded ? `${drawerWidthExpanded}px` : `${drawerWidthCollapsed}px`,
              transform: 'translateX(-50%) translateY(-50%)',
              zIndex: 1201,
              backgroundColor: "#232f3e"
            }}
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </Fab>


          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: `calc(100% - ${isSidebarExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px)`,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              {/* Define more routes as needed */}
            </Routes>
          </Box>

        </Box>
        
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
