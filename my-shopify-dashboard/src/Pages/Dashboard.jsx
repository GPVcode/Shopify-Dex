import React from 'react'
import { useQuery } from 'react-query';
import { CircularProgress, Grid, Card, Box, Paper, Typography } from '@mui/material';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';
import ProductOverview from '../Components/ProductOverview.jsx';
import TrafficSourcesPieChart from '../Components/TrafficSources.jsx';
import CustomerInsights from '../Components/CustomerInsights.jsx';
const Dashboard = () => {

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <TotalRevenue />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <RecentOrders />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <InventoryAlerts />
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <Card style={{height: '100%',  maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <ProductOverview />
          </Card>
        </Grid> */}
        <Grid item xs={12} md={3}>
          <Card style={{height: '100%',  maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          <TrafficSourcesPieChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', maxHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <CustomerInsights />
          </Card>
        </Grid>
      </Grid>

    </div>
  )
}

export default Dashboard
