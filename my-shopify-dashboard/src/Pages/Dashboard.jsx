import React from 'react'
import { useQuery } from 'react-query';
import { CircularProgress, Grid, Card, Box, Paper, Typography } from '@mui/material';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';
// import ProductOverview from '../Components/ProductOverview.jsx';
import TrafficSourcesPieChart from '../Components/TrafficSources.jsx';
import CustomerInsights from '../Components/CustomerInsights.jsx';
import ProductPerformance from '../Components/ProductPerformance.jsx';

const Dashboard = () => {

  return (
    <div style={{ padding: '5px' }}>
      <Grid container spacing={3}>
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
            <CustomerInsights />
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

    </div>
  )
}

export default Dashboard
