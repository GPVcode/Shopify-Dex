import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    const [view, setView] = useState('total');
    const [selectedMonth, setSelectedMonth] = useState('');
    
    const percentageIncrease = useMemo(() => {
        if (!data?.monthlyRevenue || Object.keys(data.monthlyRevenue).length < 2) return '0';
        const months = Object.keys(data.monthlyRevenue);
        const lastMonthRevenue = data.monthlyRevenue[months[months.length - 1]];
        const prevMonthRevenue = data.monthlyRevenue[months[months.length - 2]];
        return (((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(2);
    }, [data]);

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const months = data ? Object.keys(data.monthlyRevenue || {}) : [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedMonths = useMemo(() => months.map(month => {
        const [year, monthIndex] = month.split('-');
        return `${monthNames[parseInt(monthIndex, 10) - 1]} ${year}`;
    }), [months]);

    const revenueFigure = useMemo(() => {
        switch (view) {
            case 'total':
                return data?.totalRevenue.toLocaleString() ?? '0';
            case 'monthly':
                return data && selectedMonth ? data.monthlyRevenue[Object.keys(data.monthlyRevenue)[formattedMonths.indexOf(selectedMonth)]].toLocaleString() ?? '0' : '0';
            case 'daily':
                return data?.dailyRevenue?.[today]?.toLocaleString() ?? '0';
            default:
                return '0';
        }
    }, [data, view, selectedMonth, today, formattedMonths]);

    if (isLoading) {
        return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    } 
    if (isError) {
        return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    }

    const percentageColor = parseFloat(percentageIncrease) >= 0 ? 'green' : 'indianred';

    return (
        <Box sx={{
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
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
            }}>
                <Typography variant="h6">Total Revenue</Typography>
                <AttachMoneyIcon/> 
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${revenueFigure}
            </Typography>
            <Typography variant="body2" sx={{ color: percentageColor }}>
                {percentageIncrease}% from last month
            </Typography>
        </Box>        
    );
}

export default TotalRevenue;
