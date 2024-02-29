import React, { useState } from 'react';
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
    TableSortLabel,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { fetchProductPerformance } from '../Services/api';

const ProductPerformance = () => {
    const { data, isLoading, isError, error } = useQuery('ProductPerformance', fetchProductPerformance);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // {no sorting: ascending}

    // Sort data based on sortConfig
    const sortedData = React.useMemo(() => {
        if (!data) return [];
        const sortableItems = [...data];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    // Handle sort requests
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

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
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '2rem' 
            }}>
                <Typography variant="h6">Product Performance</Typography>
                <SortIcon />
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={sortConfig.key === 'salesVolume'}
                                direction={sortConfig.key === 'salesVolume' ? sortConfig.direction : 'asc'}
                                onClick={() => requestSort('salesVolume')}
                            >
                                Volume
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={sortConfig.key === 'revenue'}
                                direction={sortConfig.key === 'revenue' ? sortConfig.direction : 'asc'}
                                onClick={() => requestSort('revenue')}
                            >
                                Revenue
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((product) => (
                        <TableRow key={product.productId}>
                            <TableCell component="th" scope="row">
                                {product.title}
                            </TableCell>
                            <TableCell align="right">{product.salesVolume}</TableCell>
                            <TableCell align="right">${product.revenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default ProductPerformance;
