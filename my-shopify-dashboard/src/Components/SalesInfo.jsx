import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { fetchOrderCount } from '../Services/api';

function SalesInfo() {
    const { data, isLoading, isError, error } = useQuery('OrdersCount', fetchOrderCount);

    const countOrdersByMonth = (orders) => {
        return orders.reduce((acc, order) => {
            const month = order.created_at.substring(0, 7); // Get YYYY-MM
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
    };

    const calculatePercentageIncrease = (ordersByMonth) => {
        const months = Object.keys(ordersByMonth).sort();
        const lastMonth = months[months.length - 2]; // Second to last month
        const currentMonth = months[months.length - 1]; // Last month

        if (!lastMonth || !currentMonth || !ordersByMonth[lastMonth] || ordersByMonth[lastMonth] === 0) return "0"; // Return as string "0" for easier comparison

        const lastMonthOrders = ordersByMonth[lastMonth];
        const currentMonthOrders = ordersByMonth[currentMonth];

        const percentageChange = (currentMonthOrders - lastMonthOrders) / lastMonthOrders * 100;
        return percentageChange.toFixed(2); // Return as string for display
    };

    const percentageIncrease = isLoading || isError ? "0" : calculatePercentageIncrease(countOrdersByMonth(data?.orders || []));
    const isIncreasePositive = parseFloat(percentageIncrease) >= 0;

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    }
    if (isError) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    const totalOrders = data?.count.count || 0;

    return (
        <Box sx={{ 
            padding: '20px', 
            margin: '10px', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '2rem' 
                }}>
                <Typography variant="h6">Sales</Typography>
                <CreditCardIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                +{totalOrders} orders
            </Typography>
            <Typography 
                variant="body2" 
                sx={{ color: isIncreasePositive ? 'green' : 'indianred' }}
            >
                {percentageIncrease}% from last month
            </Typography>
        </Box>
    );
}

export default SalesInfo;
