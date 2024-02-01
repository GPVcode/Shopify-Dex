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
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    // Helper function to format items ordered
    const formatItemsOrdered = (items) => {
        if (!items) {
            // Return an empty string or a default value if items is undefined or null
            return '';
        }
        console.log("WHAT'S IN THE item? ", items)

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
            <Box style={{ padding: '20px', margin: '10px' }}>
                <Typography variant="h5">Recent Orders</Typography>
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
                            <TableCell style={cellStyle}>{order.order_date}</TableCell>
                            <TableCell style={cellStyle}>{formatItemsOrdered(order.line_items)}</TableCell>
                            <TableCell style={cellStyle}>
                                <Tooltip title={order.financial_status}>
                                    {getStatusIcon(order.financial_status)}
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={data.total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange={handleChangePage}
                />
            </Box>
    );
}

export default RecentOrders;
