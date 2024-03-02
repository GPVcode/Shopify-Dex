import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider, Page, Button } from '@shopify/polaris';
// import '@shopify/polaris/build/esm/styles.css';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';
// import Tasks from './Pages/Tasks';
import Accounts from './Pages/Accounts';
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
  Typography,
  Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { darkTheme } from './Styles/theme';
import ShopidexLogo from './Styles/logo/Shopidex Logo.png'
import LandingPage from './Pages/LandingPage';

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
          backgroundColor: '#0d0f0f'
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
          {['Dashboard', 'Products', 'Accounts', 'Tasks'].map((text, index) => (
            <Tooltip 
              title={isSidebarExpanded ? '' : text} 
              key={text}
              placement="right"
              enterDelay={500}
              leaveDelay={200}
            >
              <ListItemButton 
                sx={{
                  justifyContent: isSidebarExpanded ? 'initial' : 'center',
                  my: 0.5,
                }}
                onClick={() => navigate(index === 0 ? '/' : index === 1 ? '/products' : index === 2 ? '/accounts' : '/tasks')}
              >
                <ListItemIcon sx={{ minWidth: 'auto', justifyContent: 'center' }}>
                  {index === 0 ? <DashboardIcon /> : index === 1 ? <StorefrontIcon /> : index === 2 ? <AccountCircleIcon /> : <ListAltIcon />}
                </ListItemIcon>
                {isSidebarExpanded && <ListItemText primary={text} sx={{marginLeft: 1}}/>}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

      </Box>
  );
  
  const theme = {
    colors: {
      surface: '#2b2e32', // Overriding surface color
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider theme={theme} i18n={{}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Page title="Example Page">
            <Button onClick={() => alert('Clicked')}>Example Button</Button>
          </Page>
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
              position: 'fixed',
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
              {/* < Route path="/" element={<LandingPage />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/accounts" element={<Accounts />} />
              {/* <Route path="/tasks" element={<Tasks />} /> */}
              {/* Define more routes as needed */}
            </Routes>

          </Box>
        </Box>
        
      </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
