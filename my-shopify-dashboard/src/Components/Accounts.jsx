import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People'; // Using an appropriate icon for accounts
import { fetchRecentOrders } from '../Services/api'; // Ensure this is the correct import path

function Accounts() {
    const { data, isLoading, isError, error } = useQuery('accountData', fetchRecentOrders);

    const calculatePercentageIncrease = (currentTotal, previousTotal) => {
        if (!previousTotal || previousTotal === 0) return 0; // Return 0 instead of "0%" for easier numeric comparison
        const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
        return percentageChange.toFixed(2); // Return as a number for easier comparison
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    }

    if (isError) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    const totalAccounts = data ? data.total : 0; // Assuming 'total' is the total number of accounts
    const percentageIncrease = calculatePercentageIncrease(totalAccounts, 100); // Example calculation

    // Determine color based on whether percentageIncrease is positive or negative
    const percentageColor = percentageIncrease > 0 ? "green" : "indianred";

    return (
        <Box sx={{ padding: '20px', margin: '10px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Typography variant="h6">Accounts</Typography>
                <PeopleIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                +{totalAccounts.toLocaleString()} accounts
            </Typography>
            <Typography 
                variant="body2" 
                sx={{ color: percentageColor }}
            >
                {percentageIncrease > 0 ? `+${percentageIncrease}` : percentageIncrease}% from last month
            </Typography>
        </Box>
    );
}

export default Accounts;
