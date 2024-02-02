import React from 'react'
import { useQuery } from 'react-query';
import { CircularProgress, Grid, Card, Box, Paper, Typography } from '@mui/material';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';
import ProductOverview from '../Components/ProductOverview.jsx';


const Dashboard = () => {

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TotalRevenue />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <RecentOrders />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <InventoryAlerts />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ProductOverview />
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TotalRevenue />
          </Card>
        </Grid>
      </Grid>

    </div>
  )
}

export default Dashboard
