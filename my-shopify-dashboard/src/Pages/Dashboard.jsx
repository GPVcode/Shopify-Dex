import React, { useState } from 'react'
import { Grid, Card, Toolbar, Typography, Button, Box, ButtonGroup } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';
import TrafficSourcesPieChart from '../Components/TrafficSources.jsx';
import CustomerInsights from '../Components/CustomerInsights.jsx';
import ProductPerformance from '../Components/ProductPerformance.jsx';
import UserEngagementMetrics from '../Components/UserEngagementMetrics.jsx'
const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div>

      <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
        <Toolbar disableGutters>
          <Typography variant="h3" sx={{ flexGrow: 1, marginTop: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
        {/* Button Group Below Dashboard Title */}
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>  
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Overview</Button>
            <Button>Analytics</Button>
            <Button>Notifications</Button>
          </ButtonGroup>
          <Button startIcon={<DateRangeIcon />} variant="outlined" size="small">
            Time Frame
          </Button>
        </Toolbar>
      </Box>

      <Box>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <TotalRevenue />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <ProductPerformance />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <InventoryAlerts />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Card style={{height: '100%',  maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <RecentOrders />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <UserEngagementMetrics />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card style={{height: '100%',  maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <TrafficSourcesPieChart />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Card style={{ height: '100%', maxHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <CustomerInsights />
            </Card>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}

export default Dashboard
