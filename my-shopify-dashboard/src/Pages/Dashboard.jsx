import React from 'react'
import { useQuery } from 'react-query';
import { CircularProgress, Grid, Card, Box, Paper, Typography } from '@mui/material';
import { Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';
import InventoryAlerts from '../Components/InventoryAlerts.jsx';


const Dashboard = () => {
  // Example function to render a bar chart
  // const renderBarChart = (data, label) => {
  //   const chartData = {
  //     labels: data.map(item => item.name), // Adjust according to your data structure
  //     datasets: [{
  //       label: label,
  //       data: data.map(item => item.value), // Replace with actual value field
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //     }],
  //   };

  //   return <Bar data={chartData} />;
  // };
  
  // Assuming your data objects (orders, products, customers) have the necessary fields
  // You would replace these with real data and structure
  // const ordersChartData = orders.map(order => ({ name: order.id, value: order.total }));
  // const productsChartData = products.map(product => ({ name: product.name, value: product.stock }));
  // const customersChartData = customers.map(customer => ({ name: customer.name, value: customer.ordersCount }));
  

  // Function to render a summary card
  // const renderSummaryCard = (title, data, keyExtractor) => (
  //   <Card>
  //     <Box style={{ padding: '20px', margin: '10px' }}>
  //     <Typography variant="h6">{title}</Typography>
  //     <ul>
  //       {data.slice(0, 5).map(item => (
  //         <li key={keyExtractor(item)}>
  //           {item.name} - <strong>{item.status}</strong> - {item.amount}
  //         </li> // Adjust according to your data
  //       ))}
  //     </ul>
  //     </ Box>
  //   </Card>
  // );

  return (
    <div style={{ padding: '20px' }}>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TotalRevenue />
        </Grid>
        <Grid item xs={12} md={6} style={{ maxHeight: '12 rem', gridRowEnd: 'span 2' }}>
          <RecentOrders />
        </Grid>
        <Grid item xs={12} md={3}>
          <InventoryAlerts />
        </Grid>
        <Grid item xs={12} md={3}>
          <TotalRevenue />
        </Grid>
        <Grid item xs={12} md={3}>
          <TotalRevenue />
        </Grid>
      </Grid>

      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h6">Sales Overview</Typography>
            {renderBarChart(ordersChartData, 'Total Sales')}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h6">Product Stock Levels</Typography>
            {renderBarChart(productsChartData, 'Stock Level')}
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h6">Customer Activity</Typography>
            {renderBarChart(customersChartData, 'Orders Count')}
          </Paper>
        </Grid> 
      </Grid>*/}
    </div>
  )
}

export default Dashboard
