import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Card, Box, Typography } from '@mui/material';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    if (isLoading){
        return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
    } 
    if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    return (
        <Card style={{ minHeight: '200px' }}>
            <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Total Revenue</Typography>
            {data && data.totalRevenue != null ? (
                <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                    ${data.totalRevenue.toLocaleString()}
                </Typography>
            ) : (
                <Typography variant='subtitle1'>No Revenue Data Available</Typography>
            )}
            </Box>
        </Card>
        

    );
}

export default TotalRevenue;
