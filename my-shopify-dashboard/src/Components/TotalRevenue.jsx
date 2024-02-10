import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography, ButtonGroup, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    const [view, setView] = useState('total'); // 'total', 'monthly', or 'daily'
    const [selectedMonth, setSelectedMonth] = useState('');
    

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const months = data ? Object.keys(data.monthlyRevenue || {}) : [];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedMonths = useMemo(() => months.map(month => {
        const [year, monthIndex] = month.split('-');
        return `${monthNames[parseInt(monthIndex, 10) - 1]} ${year}`;
    }), [months]);

    const revenueFigure = useMemo(() => {
        switch (view) {
            case 'total':
                return data ? data.totalRevenue.toLocaleString() : '0';
            case 'monthly':
                return data && selectedMonth ? data.monthlyRevenue[Object.keys(data.monthlyRevenue)[formattedMonths.indexOf(selectedMonth)]].toLocaleString() : '0';
            case 'daily':
                return data && data.dailyRevenue && data.dailyRevenue[today] ? data.dailyRevenue[today].toLocaleString() : '0';
            default:
                return '0';
        }
    }, [data, view, selectedMonth, today, formattedMonths]);

    const revenueData = useMemo(() => {
        switch (view) {
            case 'total':
                return months.map(month => ({
                    time: monthNames[parseInt(month.split('-')[1], 10) - 1],
                    revenue: data.monthlyRevenue[month]
                }));
            case 'monthly':
                if (!selectedMonth || !data.dailyRevenue) {
                    return [];
                }
                // Extract the year and month from the selectedMonth
                // Assuming selectedMonth is in "MMM YYYY" format (e.g., "Feb 2024")
                const [selectedMonthName, selectedYear] = selectedMonth.split(' ');
                const monthIndex = monthNames.findIndex(month => month === selectedMonthName) + 1;
                const monthPrefix = `${selectedYear}-${monthIndex.toString().padStart(2, '0')}`;
    
                // Filter and map dailyRevenue entries for the selected month
                return Object.entries(data.dailyRevenue).filter(([date]) => 
                    date.startsWith(monthPrefix)
                ).map(([date, revenue]) => ({
                    time: date.substring(8), // Get the day part of the date string
                    revenue
                }));
            case 'daily':
                return []; // No chart data needed for 'daily'
            default:
                return [];
        }
    }, [data, view, selectedMonth, today, formattedMonths, monthNames]);


    if (isLoading) {
        return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    } 
    if (isError) {
        return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
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
            <Typography variant="h5">Revenue</Typography>
            <ButtonGroup 
                size="sm" 
                aria-label="outlined button group"
                style={{ 
                    marginTop: 15,
                    marginBottom: 15
                }}
            >
                <Button onClick={() => setView('total')}>Total</Button>
                <Button onClick={() => setView('monthly')}>Monthly</Button>
                <Button onClick={() => setView('daily')}>Today</Button>
            </ButtonGroup>
            {view === 'monthly' && (
                <Box display="flex" justifyContent="left" marginBottom="20px">
                    <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            label="Month"
                        >
                            {formattedMonths.map((formattedMonth, index) => (
                                <MenuItem key={months[index]} value={formattedMonth}>{formattedMonth}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}
            <Typography variant="h4" sx={{ marginBottom: '30px', fontWeight: 'bold' }}>
                ${revenueFigure}
            </Typography>
            {view !== 'daily' && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis fontSize='0.71rem' dataKey="time" />
                        <YAxis fontSize='0.71rem' />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Box>        
    );
}

export default TotalRevenue;
