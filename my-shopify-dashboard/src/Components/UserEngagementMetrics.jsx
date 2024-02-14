import React from 'react';
import { useQuery } from 'react-query';
import {
    CircularProgress,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { fetchUserEngagementMetrics } from '../Services/api'; // Ensure this path matches your project structure

const UserEngagementMetrics = () => {
    const { data, isLoading, isError, error } = useQuery('UserEngagementMetrics', fetchUserEngagementMetrics);

    if (isLoading) {
        return (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box style={{ padding: '20px', margin: '10px' }}>
                <Typography color="error">Error: {error.message}</Typography>
            </Box>
        );
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
                background: '#3f9068',
                },
            }}
        >
            <Typography 
                variant="h5" 
                style={{ marginBottom: '20px' }}
            >User Engagement Metrics
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell align="right">Session Duration (min)</TableCell>
                        <TableCell align="right">Pages per Session</TableCell>
                        <TableCell align="right">Bounce Rate (%)</TableCell>
                        <TableCell align="right">Active Users</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.data.map((metric) => (
                        <TableRow key={metric.month}>
                            <TableCell component="th" scope="row">
                                {metric.month}
                            </TableCell>
                            <TableCell align="right">{metric.sessionDuration}</TableCell>
                            <TableCell align="right">{metric.pagesPerSession}</TableCell>
                            <TableCell align="right">{metric.bounceRate}</TableCell>
                            <TableCell align="right">{metric.activeUsers}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default UserEngagementMetrics;
