import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchTotalRevenue } from '../Services/api';
import { CircularProgress, Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; 

function RevenueOverview() {
    const { data, isLoading, isError, error } = useQuery('totalRevenue', fetchTotalRevenue);

    // Process data for the chart
    const chartData = useMemo(() => {
        if (!data || !data.monthlyRevenue) return [];
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return Object.keys(data.monthlyRevenue).map(month => ({
            month: `${monthNames[parseInt(month.split('-')[1], 10) - 1]} ${month.split('-')[0]}`,
            revenue: data.monthlyRevenue[month],
        }));
    }, [data]);

    if (isLoading) {
        return <Box sx={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    } 
    if (isError) {
        return <Box sx={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    }

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
                <Typography variant="h6">Overview</Typography>
                <AccountBalanceIcon />
            </Box>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export default RevenueOverview;
