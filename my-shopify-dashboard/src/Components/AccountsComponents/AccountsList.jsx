import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomerInsights } from '../../Services/api';
import {
  CircularProgress, Box, Typography, Table, TableBody, TableCell, 
  TableHead, TableRow, TablePagination, IconButton, TextField, Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountsColumnPreferences from './AccountsColumnPreferences';

const initialColumns = [
  { id: 'name', label: 'Name', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'status', label: 'Status', visible: true },
  { id: 'totalSpent', label: 'Total Spent', visible: true },
];

const AccountsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [columns, setColumns] = useState(initialColumns);

  const { data, error, isLoading, isError } = useQuery(['customerInsights', page, rowsPerPage], () => fetchCustomerInsights(page + 1, rowsPerPage), { keepPreviousData: true });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data.customers) {
    return (
      <Box sx={{ padding: '20px' }}>
        <Alert severity="error">{error ? error.message : 'Failed to load data'}</Alert>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h4">Accounts List</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: '1rem' }}>
          <TextField 
            size="small"
            sx={{ '.MuiOutlinedInput-root': { borderRadius: '50px' } }}
            placeholder='Search...'
          />
          < AccountsColumnPreferences />
          <AccountCircleIcon />
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {columns.filter(column => column.visible).map(column => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.customers.map(customer => (
            <TableRow key={customer.id}>
              {columns.map(column => {
                if (!column.visible) return null;
                let cellValue;
                switch (column.id) {
                  case 'name':
                    cellValue = `${customer.first_name} ${customer.last_name}`;
                    break;
                  case 'email':
                    cellValue = customer.email;
                    break;
                  case 'status':
                    cellValue = customer.customer_status;
                    break;
                  case 'totalSpent':
                    cellValue = `$${customer.total_spent}`;
                    break;
                  default:
                    cellValue = '';
                }
                return <TableCell key={column.id}>{cellValue}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
};

export default AccountsList;
