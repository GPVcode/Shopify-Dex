import React from 'react'
import { useQuery } from 'react-query';
import { CircularProgress, Grid, Card, Box, Paper, Typography } from '@mui/material';
import { Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import TotalRevenue from '../Components/TotalRevenue.jsx';
import RecentOrders from '../Components/RecentOrders.jsx';

// Dummy data for orders
const dummyOrders = [
  { id: 1, name: "Order 1", status: "Delivered", amount: "$120.00" },
  { id: 2, name: "Order 2", status: "Processing", amount: "$250.00" },
  { id: 3, name: "Order 3", status: "Shipped", amount: "$180.00" },
  { id: 4, name: "Order 4", status: "Delivered", amount: "$90.00" },
  { id: 5, name: "Order 5", status: "Cancelled", amount: "$200.00" }
];

// Dummy data for products
const dummyProducts = [
  { id: 1, name: "Product A", stock: 20, category: "Electronics" },
  { id: 2, name: "Product B", stock: 5, category: "Apparel" },
  { id: 3, name: "Product C", stock: 0, category: "Home Goods" },
  { id: 4, name: "Product D", stock: 15, category: "Electronics" },
  { id: 5, name: "Product E", stock: 8, category: "Books" }
];

// Dummy data for customers
const dummyCustomers = [
  { id: 1, name: "Alice", email: "alice@example.com", totalOrders: 5 },
  { id: 2, name: "Bob", email: "bob@example.com", totalOrders: 3 },
  { id: 3, name: "Charlie", email: "charlie@example.com", totalOrders: 2 },
  { id: 4, name: "Peppy", email: "peppy@example.com", totalOrders: 4 },
  { id: 5, name: "Edward", email: "edward@example.com", totalOrders: 1 }
];

// Update your fetch functions to use dummy data instead of making actual API calls
// const fetchOrders = async () => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return dummyOrders;
// };

// const fetchProducts = async () => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return dummyProducts;
// };

// const fetchCustomers = async () => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return dummyCustomers;
// };

// Fetching functions
const fetchOrders = async () => {
  // const { data } = await axios.get('/api/orders');
  return dummyOrders;
};
const fetchProducts = async () => {
  // const { data } = await axios.get('/api/products');
  return dummyProducts;
};
const fetchCustomers = async () => {
  // const { data } = await axios.get('/api/customers');
  return dummyCustomers;
};


const Dashboard = () => {

  // Let's use React Query to handle server states for efficient data fetching, caching, and state synchronization.
  // This approach allows each component to manage its own data fetching logic, reducing the need for prop drilling and lifting state up.
  // Fetch queries
  const ordersQuery = useQuery('orders', fetchOrders);
  const productsQuery = useQuery('products', fetchProducts);
  const customersQuery = useQuery('customers', fetchCustomers);
  // Combined loading state Circular progress if loading.
  if (ordersQuery.isLoading || productsQuery.isLoading || customersQuery.isLoading) {
    return <CircularProgress />;
  }  
  // Combined error state; Combined error message state
  if (ordersQuery.isError || productsQuery.isError || customersQuery.isError) {
    return <div>Error loading data</div>;
  }  
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

  // Varables hosting orders, products, and customers data.
  const { data: orders } = ordersQuery;
  const { data: products } = productsQuery;
  const { data: customers } = customersQuery;
  
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
        <Grid item xs={12} md={2}>
          <TotalRevenue />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentOrders />
          {/* {renderSummaryCard('Recent Orders', orders, order => order.id)} */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* {renderSummaryCard('Popular Products', products, product => product.id)} */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* {renderSummaryCard('Recent Customers', customers, customer => customer.id)} */}
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
