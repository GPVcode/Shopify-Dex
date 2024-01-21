import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

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
