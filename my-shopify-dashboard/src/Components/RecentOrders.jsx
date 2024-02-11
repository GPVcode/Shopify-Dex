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
import {
    CheckCircle,
    HighlightOff, 
    Schedule, 
    Info
} from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { fetchRecentOrders } from '../Services/api';

const RecentOrders = () => {

    const [page, setPage] = useState(0); // Zero-based page index
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data, isLoading, isError, error } = useQuery(['Recent Orders', page, rowsPerPage], () => fetchRecentOrders(page + 1, rowsPerPage), {
        keepPreviousData: true,
    });

    if (isLoading){
        return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
    } 

    if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { // You can adjust the locale and options
            month: 'short', // "Jan", "Feb", etc.
            day: '2-digit', // "01", "02", etc.
            year: 'numeric', // "2024"
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };
    
    // Helper function to format items ordered
    const formatItemsOrdered = (items) => {
        if (!items) {
            return '';
        }

        return items.map(item => `${item.title} (x${item.quantity})`).join(', ');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Paid':
                return <CheckCircle style={{ color: 'green' }} />;
            case 'Refunded':
                return <HighlightOff style={{ color: 'red' }} />;
            case 'Pending':
                return <Schedule style={{ color: 'orange' }} />;
            default:
                return <Info />;
        }
    };

    const cellStyle = {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    };


    // Check if data.orders is an array before mapping
    return (
            <Box 
                style={{ padding: '20px', margin: '10px' }}
                sx={{
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
                >Recent Orders</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell style={cellStyle}>Order ID</TableCell>
                        <TableCell style={cellStyle}>Customer</TableCell>
                        <TableCell style={cellStyle}>Total Price</TableCell>
                        <TableCell style={cellStyle}>Order Date</TableCell>
                        <TableCell style={cellStyle}>Items Ordered</TableCell>
                        <TableCell style={cellStyle}>Payment Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.orders && data.orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell style={cellStyle}>{order.id}</TableCell>
                            <TableCell style={cellStyle}>{order.customer.first_name} {order.customer.last_name}</TableCell>
                            <TableCell style={cellStyle}>${order.total_price}</TableCell>            
                            <TableCell style={cellStyle}>{formatDate(order.order_date)}</TableCell>
                            <TableCell style={cellStyle}>{formatItemsOrdered(order.line_items)}</TableCell>
                            <TableCell style={cellStyle}>
                                <Tooltip title={order.financial_status}>
                                    {getStatusIcon(order.financial_status)}
                                </Tooltip>
                            </TableCell>
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
                            sx={{
                                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiTablePagination-select, .MuiTablePagination-actions': {
                                  fontSize: '0.68rem',
                                },
                            }}
                        />
                        </TableRow>
                    </TableFooter>
                </Table>
                
            </Box>
    );
}

export default RecentOrders;
