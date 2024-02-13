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
import { fetchProductPerformance } from '../Services/api'; // Ensure this path matches your project structure

const ProductPerformance = () => {
    const { data, isLoading, isError, error } = useQuery('ProductPerformance', fetchProductPerformance);

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
            >Product Performance
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Volume</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                        {/* <TableCell align="right">Profit %</TableCell> */}
                        {/* <TableCell align="right">Return Rate</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((product) => (
                        <TableRow key={product.productId}>
                            <TableCell component="th" scope="row">
                                {product.title}
                            </TableCell>
                            <TableCell align="right">{product.salesVolume}</TableCell>
                            <TableCell align="right">${product.revenue}</TableCell>
                            {/* <TableCell align="right">{product.profitMargin}</TableCell> */}
                            {/* <TableCell align="right">{product.returnRate}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default ProductPerformance;
