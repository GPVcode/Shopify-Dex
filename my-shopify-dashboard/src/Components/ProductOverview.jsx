import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { 
    CircularProgress, 
    Box, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Typography, 
    TableFooter,
    TablePagination
} from '@mui/material';
import { fetchProductsOverview } from '../Services/api'; // Adjust the import path as necessary

const ProductsOverviewComponent = () => {
    const [page, setPage] = useState(0); // Zero-based page index for consistency with Material UI
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data, isLoading, isError, error } = useQuery(
        ['Products Overview', page, rowsPerPage], 
        () => fetchProductsOverview(page + 1, rowsPerPage), 
        { keepPreviousData: true }
    );

    if (isLoading) {
        return <Box sx={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    }

    if (isError) {
        return <Box sx={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Custom cell style
    const cellStyle = {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    };

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
          }}>
            <Typography variant="h5">Products Overview</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={cellStyle}>Title</TableCell>
                        <TableCell sx={cellStyle}>Stock</TableCell>
                        <TableCell sx={cellStyle}>Sales Velocity</TableCell>
                        <TableCell sx={cellStyle}>Profit Margin</TableCell>
                        <TableCell sx={cellStyle}>Reorder Level</TableCell>
                        <TableCell sx={cellStyle}>Lead Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.detailedProducts.map((product) => (
                        <TableRow key={product.product_id}>
                            <TableCell sx={cellStyle}>{product.title}</TableCell>
                            <TableCell sx={cellStyle}>{product.stock}</TableCell>
                            <TableCell sx={cellStyle}>{product.sales_velocity} per day</TableCell>
                            <TableCell sx={cellStyle}>{product.profit_margin}</TableCell>
                            <TableCell sx={cellStyle}>{product.reorder_level}</TableCell>
                            <TableCell sx={cellStyle}>{product.lead_time_days} days</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={data.total}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
                
            </Table>
        </Box>
    );
};

export default ProductsOverviewComponent;
