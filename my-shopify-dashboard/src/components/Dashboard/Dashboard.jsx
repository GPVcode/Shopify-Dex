import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

// Fetching functions
const fetchOrders = async () => {
  const { data } = await axios.get('/api/orders');
  return data;
};

const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

const fetchCustomers = async () => {
  const { data } = await axios.get('/api/customers');
  return data;
};

const Dashboard = () => {
  // Fetch queries
  const ordersQuery = useQuery('orders', fetchOrders);
  const productsQuery = useQuery('products', fetchProducts);
  const customersQuery = useQuery('customers', fetchCustomers);

  // Combined loading state
  const isLoading = ordersQuery.isLoading || productsQuery.isLoading || customersQuery.isLoading;
  // Combined error state
  const isError = ordersQuery.isError || productsQuery.isError || customersQuery.isError;
  const errorMessage = ordersQuery.error || productsQuery.error || customersQuery.error;

  if (isLoading){
    
  }
  const { 
    data: orders, 
    isLoading: ordersLoading, 
    isError: orderErrorStatus, 
    error: orderErrorMessage
  } = useQuery('orders', fetchOrders);

  const { 
    data: products, 
    isLoading: productsLoading, 
    isError: productsErrorStatus, 
    error: productsErrorMessage
  } = useQuery('products', fetchProducts);

  const { 
    data: customers,
    isLoading: customersLoading, 
    isError: customersErrorStatus, 
    error: customersErrorMessage
  } = useQuery('customers', fetchCustomers);
  return (
    <div>
      HelloOOOO
    </div>
  )
}

export default Dashboard
