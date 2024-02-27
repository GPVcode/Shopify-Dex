import React, { useState } from 'react';
import {
  Grid,
  Card,
  Toolbar,
  Typography,
  Box,
  ButtonGroup,
  Button
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';
import TrafficSourcesPieChart from '../Components/TrafficSources.jsx';
import CustomerInsights from '../Components/CustomerInsights.jsx';
import ProductPerformance from '../Components/ProductPerformance.jsx';
import UserEngagementMetrics from '../Components/UserEngagementMetrics.jsx';
import RevenueOverview from '../Components/RevenueOverview.jsx';
import SalesInfo from '../Components/SalesInfo.jsx';
import Accounts from '../Components/Accounts.jsx';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  const handleViewChange = (view) => {
    setActiveView(view);
  }

  // Custom style for active and outlined buttons
  const buttonStyle = (view) => ({
    color: isActive(view) === 'contained' ? '#ffffff' : '#232f3e',
    backgroundColor: isActive(view) === 'contained' ? '#232f3e' : '',
    borderColor: '#232f3e',
    '&:hover': {
      backgroundColor: isActive(view) === 'contained' ? '#232f3e' : '',
      borderColor: '#232f3e',
      opacity: isActive(view) === 'contained' ? 0.9 : 1,
    },
  });
  
  const isActive = (view) => {
    return activeView === view ? 'contained' : 'outlined';
  }
  

  return (
    <>
    <Box sx={{ flexGrow: 1, mt: 4, ml: 1, mr: 1, mb: 3, overflowY: 'auto' }}>
      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Toolbar disableGutters>
          <Typography variant="h3" sx={{ flexGrow: 1, mt: 1, mb: 1, color: '#ffffff' }}>
            Dashboard
          </Typography>
        </Toolbar>
       
        {/* <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            {['overview', 'analytics', 'notifications'].map((view) => (
              <Button
                key={view}
                variant={isActive(view)}dd
                onClick={() => handleViewChange(view)}
                sx={buttonStyle(view)} // Apply the custom style based on the active state
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
          <Button startIcon={<DateRangeIcon />} variant="outlined" size="small" sx={{ borderColor: '#232f3e', color: '#232f3e' }}>
            Time Frame
          </Button>
        </Toolbar> */}
      </Box>

        <Box >
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Card 
                style={{ 
                  height: '100%', maxHeight: '200px', 
                  display: 'flex', flexDirection: 'column', 
                  overflow: 'auto', borderRadius: "12px",
                  border: '1px solid #232f3e'
              }}>
                <TotalRevenue />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Card 
                  style={{ 
                    height: '100%', maxHeight: '200px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>
                <SalesInfo />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Card 
                  style={{ 
                    height: '100%', maxHeight: '200px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>
                <Accounts />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card 
                  style={{
                    height: '100%',  maxHeight: '200px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
            }}>                
                <InventoryAlerts />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
              <Card style={{ 
                  height: '100%', maxHeight: '450px', 
                  display: 'flex', flexDirection: 'column', 
                  overflow: 'auto', borderRadius: "12px",
                  border: '1px solid #232f3e' 
              }}>
                <RecentOrders />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Card 
                  style={{ 
                    height: '100%', maxHeight: '450px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>
                <ProductPerformance />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card 
                  style={{
                    height: '100%',  mHeight: '650px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>
                <RevenueOverview />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={1}>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
            <Card 
                  style={{
                    height: '100%',  mHeight: '650px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>
                <UserEngagementMetrics />
            </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Card 
                  style={{ 
                    height: '100%', maxHeight: '600px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
                }}>                
                  <TrafficSourcesPieChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card 
                  style={{ 
                    height: '100%', maxHeight: '600px', 
                    display: 'flex', flexDirection: 'column', 
                    overflow: 'auto', borderRadius: "12px",
                    border: '1px solid #232f3e'
              }}>          
                <CustomerInsights />
              </Card>
            </Grid>
          </Grid>
        </Box>
{/* 
      {activeView === 'analytics' && (
        <Box>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <RecentOrders />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <CustomerInsights />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card style={{height: '100%',  maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <TrafficSourcesPieChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <UserEngagementMetrics />
              </Card>
            </Grid>
          </Grid>
        </Box>
      )} */}
    </Box>
    </>
  )
}

export default Dashboard
