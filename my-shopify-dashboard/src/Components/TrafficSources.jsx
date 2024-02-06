import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchTrafficSources } from '../Services/api'; // Adjust the import path as necessary

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
const TrafficSourcesPieChart = () => {
    const { data: rawData, isLoading, isError, error } = useQuery('trafficSources', fetchTrafficSources);

    // Transform data to include a 'name' property for Recharts
    const data = rawData?.map(d => ({ name: d.source, visits: d.visits })) || [];

    if (isLoading) {
        return <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
        </Box>;
    } 
    if (isError) {
        return <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="subtitle1">Error: {error.message}</Typography>
        </Box>;
    }

    return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Traffic Sources</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="visits"
                        style={{ fontSize: '12px' }} 
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};


export default TrafficSourcesPieChart;
