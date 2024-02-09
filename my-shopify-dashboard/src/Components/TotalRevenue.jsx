import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography, ButtonGroup, Button, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
    const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue);
    const [view, setView] = useState('total'); // 'total', 'monthly', or 'daily'
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]); // Default to current day

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    // Generate a list of unique months and days for the selectors
    const months = data ? Object.keys(data.monthlyRevenue || {}) : [];
    const days = data ? Object.keys(data.dailyRevenue || {}) : [];

    const revenueData = React.useMemo(() => {
        switch (view) {
            case 'total':
                return months.map(month => ({
                    time: month,
                    revenue: data.monthlyRevenue[month]
                }));
            case 'monthly':
                // Filter daily revenue data for the selected month
                const monthlyData = days.filter(day => day.includes(selectedMonth))
                    .map(day => ({
                        time: day,
                        revenue: data.dailyRevenue[day]
                    }));
                return monthlyData;
            case 'daily':
                // Just a single data point for the selected day, but we need an array for the chart
                return [{
                    time: selectedDay,
                    revenue: data.dailyRevenue[selectedDay] || 0
                }];
            default:
                return [];
        }
    }, [data, view, selectedMonth, selectedDay]);

    if (isLoading) {
        return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    } 
    if (isError) {
        return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    }

    return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Total Revenue</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginBottom: '20px' }}>
                <Button onClick={() => setView('total')}>Total</Button>
                <Button onClick={() => setView('monthly')}>Monthly</Button>
                <Button onClick={() => setView('daily')}>Daily</Button>
            </ButtonGroup>
            {view === 'monthly' && (
                <Select value={selectedMonth} onChange={handleMonthChange} displayEmpty>
                    {months.map(month => (
                        <MenuItem key={month} value={month}>{month}</MenuItem>
                    ))}
                </Select>
            )}
            {view === 'daily' && (
                <Select value={selectedDay} onChange={handleDayChange} displayEmpty>
                    {days.map(day => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                    ))}
                </Select>
            )}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis fontSize='0.71rem' dataKey="time" />
                    <YAxis fontSize='0.71rem' />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Box>        
    );
}

export default TotalRevenue;
