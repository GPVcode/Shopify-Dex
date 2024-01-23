import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    if (isLoading) return <p>< CircularProgress /></p>;
    if (isError) return <p>Error: {error.message}</p>;

    console.log("8:", data.dummyRevenue);

    return (
        <Paper style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h6">Total Revenue</Typography>
            {data && data.totalRevenue != null ? (
                <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                    ${data.totalRevenue.toLocaleString()}
                </Typography>
            ) : (
                <Typography variant='subtitle1'>No Revenue Data Available</Typography>
            )}
            
        </Paper>
    );
}

export default TotalRevenue;
