import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Card, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { fetchRecentOrders } from '../Services/api';

const RecentOrders = () => {
    const { data, isLoading, isError, error } = useQuery('Recent Orders', fetchRecentOrders);
    if (isLoading){
        return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
    } 
    if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    return (
        <Card style={{ minHeight: '13.5rem' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer && order.customer.first_name} {order.customer && order.customer.last_name}</TableCell>
                            <TableCell>${order.total_price}</TableCell>
                            <TableCell>{order.financial_status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default RecentOrders;
