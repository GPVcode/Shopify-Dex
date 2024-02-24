import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchTotalRevenue } from '../Services/api';
import { CircularProgress, Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; 

function RevenueOverview() {
    const { data, isLoading, isError, error } = useQuery('totalRevenue', fetchTotalRevenue);

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
        <Box 
            sx={{
                padding: '20px', 
                margin: '10px',
                overflowY: 'auto',
                maxHeight: '500px',
                '&::-webkit-scrollbar': {
                width: '10px',
                },
                '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',
                borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                background: 'darkgrey',
                borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                background: '#232f3e',
                },
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '2rem' 
                }}>
                <Typography variant="h5">Revenue Overview</Typography>
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
