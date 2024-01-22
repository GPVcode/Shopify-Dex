import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';

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
const fetchOrders = async () => {
  // Simulating a delay to mimic an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyOrders;
};

const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyProducts;
};

const fetchCustomers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyCustomers;
};


// Dummy data for customers
// const dummyCustomers = [
//   { id: 1, name: "Alice", email: "alice@example.com", totalOrders: 5 },
//   { id: 2, name: "Bob", email: "bob@example.com", totalOrders: 3 },
//   { id: 3, name: "Charlie", email: "charlie@example.com", totalOrders: 2 },
//   { id: 4, name: "Diana", email: "diana@example.com", totalOrders: 4 },
//   { id: 5, name: "Edward", email: "edward@example.com", totalOrders: 1 }
// ];

// // Fetching functions
// const fetchOrders = async () => {
//   const { data } = await axios.get('/api/orders');
//   return data;
// };
// const fetchProducts = async () => {
//   const { data } = await axios.get('/api/products');
//   return data;
// };
// const fetchCustomers = async () => {
//   const { data } = await axios.get('/api/customers');
//   return data;
// };


const Dashboard = () => {


  // Let's use React Query to handle server states for efficient data fetching, caching, and state synchronization.
  // This approach allows each component to manage its own data fetching logic, reducing the need for prop drilling and lifting state up.
  // Fetch queries
  const ordersQuery = useQuery('orders', fetchOrders);
  const productsQuery = useQuery('products', fetchProducts);
  const customersQuery = useQuery('customers', fetchCustomers);
  // Combined loading state
  const isLoading = ordersQuery.isLoading || productsQuery.isLoading || customersQuery.isLoading;
  // Combined error state
  const isError = ordersQuery.isError || productsQuery.isError || customersQuery.isError;
  // Combined error message state
  const errorMessage = ordersQuery.error || productsQuery.error || customersQuery.error;


  // Loading message if isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  };
  // Error message if message is true
  if(isError) {
    return <div>Error: { errorMessage.message }</div>;
  };


  // Varables hosting orders, products, and customers data.
  const { data: orders } = ordersQuery;
  const { data: products } = productsQuery;
  const { data: customers } = customersQuery;


  // Function to render a summary card
  const renderSummaryCard = (title, data, keyExtractor) => (
    <Paper style={{ padding: '20px', margin: '10px' }}>
      <Typography variant="h6">{title}</Typography>
      <ul>
        {data.slice(0, 5).map(item => (
          <li key={keyExtractor(item)}>{item.name}</li> // Adjust according to your data
        ))}
      </ul>
    </Paper>
  );

  return (
    <div style={{ padding: '20px' }}>
      {isLoading && <CircularProgress />}
      {isError && <div>Error: {errorMessage.message}</div>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {renderSummaryCard('Recent Orders', orders, order => order.id)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSummaryCard('Popular Products', products, product => product.id)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderSummaryCard('Recent Customers', customers, customer => customer.id)}
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
