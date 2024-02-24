import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
    CircularProgress,
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination
} from '@mui/material';
import { fetchCustomerInsights } from '../Services/api';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const CustomerInsights = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { data, isLoading, isError, error } = useQuery(
        ['CustomerInsights', page, rowsPerPage], 
        () => fetchCustomerInsights(page + 1, rowsPerPage), 
        {
            keepPreviousData: true,
        }
    );

    if (isLoading) {
        return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    }

    if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
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
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
            }}>
                <Typography variant="h5">Customer Insights</Typography>
                <PersonSearchIcon/> 
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Orders</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {data?.customers.map(customer => (
                    <TableRow key={customer.id}>
                        <TableCell>{customer.customer_status}</TableCell>
                        <TableCell>{customer.first_name} {customer.last_name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.orders_count}</TableCell>
                        <TableCell>${customer.total_spent}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={data?.total || 0}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPage={rowsPerPage}
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
};

export default CustomerInsights;
