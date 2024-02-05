import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    
    const formatDate = (dateString) => {
        const options = { month: 'short'};
        const date = new Date(dateString + '-01');
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    
    const monthlyRevenueData = data ? Object.entries(data.monthlyRevenue || {}).map(([month, revenue]) => ({
        month: formatDate(month), 
        revenue
    })) : [];

    if (isLoading){
        return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
    } 
    if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
   
    return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Total Revenue</Typography>
            {data && data.totalRevenue != null ? (
                <>
                   <Typography variant="h4" sx={{ marginTop: '30px', marginBottom: '30px', fontWeight: 'bold' }}>
                        ${data.totalRevenue.toLocaleString()}
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis fontSize='0.71rem' dataKey="month" />
                            <YAxis fontSize='0.71rem' />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            ) : (
                <Typography variant='subtitle1'>No Revenue Data Available</Typography>
            )}
        </Box>        
    );
}

export default TotalRevenue;
