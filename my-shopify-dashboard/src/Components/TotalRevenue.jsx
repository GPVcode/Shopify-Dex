import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchTotalRevenue } from '../Services/api';

function TotalRevenue() {
  const [view, setView] = useState('total');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Using useQuery to fetch total revenue data
  const { data, isLoading, isError, error } = useQuery('Total Revenue', fetchTotalRevenue, {
    // refetchOnWindowFocus: true,
  });

  // useMemo to calculate revenue figure based on the current view
  const revenueFigure = React.useMemo(() => {
    if (!data) return '0';
    switch (view) {
      case 'total':
        return data.totalRevenue.toLocaleString();
      case 'monthly':
        if (selectedMonth && data.monthlyRevenue[selectedMonth]) {
          return data.monthlyRevenue[selectedMonth].toLocaleString();
        }
        return '0';
      case 'daily':
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        if (data.dailyRevenue && data.dailyRevenue[today]) {
          return data.dailyRevenue[today].toLocaleString();
        }
        return '0';
      default:
        return '0';
    }
  }, [data, view, selectedMonth]);

  if (isLoading) return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
  if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;

  return (
    <Box sx={{ padding: '20px', margin: '10px', overflowY: 'auto', maxHeight: '500px', '&::-webkit-scrollbar': { width: '10px' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <Typography variant="h6">Total Revenue</Typography>
        <AttachMoneyIcon />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${revenueFigure}</Typography>
    </Box>
  );
}

export default TotalRevenue;
