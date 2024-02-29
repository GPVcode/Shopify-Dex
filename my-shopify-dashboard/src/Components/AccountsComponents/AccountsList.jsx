import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomerInsights } from '../../Services/api';
import {
  CircularProgress, Box, Typography, Table, TableBody, TableCell, 
  TableHead, TableRow, TablePagination, TextField, Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountsColumnPreferences from './AccountsColumnPreferences';
import { filterAccounts } from './utils/filterAccounts';

const initialColumns = [
  { id: 'name', label: 'Name', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'status', label: 'Status', visible: true },
  { id: 'totalSpent', label: 'Total Spent', visible: true },
  { id: 'ordersCount', label: 'Orders Count', visible: false },
  { id: 'id', label: 'ID', visible: false },
  { id: 'created_at', label: 'Created At', visible: false },
  { id: 'city', label: 'City', visible: false },
  { id: 'province', label: 'Province', visible: false },
  { id: 'country', label: 'Country', visible: false },
  { id: 'customer_status', label: 'Customer Status', visible: false }
];

// Initial user preferences for column visibility
const initialUserPreferences = {
  visible_columns: ['name', 'email', 'status', 'totalSpent'],
};

const getStatusStyles = (status) => {
  let color;
  switch (status) {
    case 'New':
      color = 'lightBlue';
      break;
    case 'Returning':
      color = 'green';
      break;
    case 'High-Value':
      color = 'gold';
      break;
    default:
      color = 'grey';
  }

  return (
    <span style={{ color: color }}>
      {status}
    </span>
  );
};


const AccountsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const [userPreferences, setUserPreferences] = useState(initialUserPreferences);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, error, isLoading, isError } = useQuery(
    ['customerInsights', page, rowsPerPage], 
    async () => await fetchCustomerInsights(page + 1, rowsPerPage), 
    { keepPreviousData: true }
  );

  const handleChangePage = (event, newPage) =>{
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <CircularProgress size={10} />
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

  const filteredAccounts = filterAccounts(data?.customers, searchQuery);

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
          flexDirection: { xs: 'column', sm: 'column', med: 'column', lg: 'row' },
          justifyContent: 'space-between', 
          marginBottom: '2rem', 
          gap: 2,
        }}>
        <Typography variant="h4">Accounts List</Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'left', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: 2, 
        }}>
          <Box>
            <TextField 
              size="small"
              sx={{ '.MuiOutlinedInput-root': { borderRadius: '50px' } }}
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          {columns && (
          < AccountsColumnPreferences 
            open={preferencesOpen}
            onClose={() => setPreferencesOpen(false)}
            columns={columns}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            setColumns={setColumns}
          />
          )}
          <AccountCircleIcon />
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {columns.filter(column => userPreferences.visible_columns.includes(column.id)).map(column => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAccounts.map(customer => (
            <TableRow key={customer.id}>
              {columns.filter(column => userPreferences.visible_columns.includes(column.id)).map(column => (
                    <TableCell key={column.id}>
                      {column.id === 'name' && `${customer.first_name} ${customer.last_name}`}
                      {column.id === 'email' && customer.email}
                      {column.id === 'status' && getStatusStyles(customer.customer_status)}
                      {column.id === 'totalSpent' && customer.total_spent}
                      {column.id === 'ordersCount' && customer.orders_count}
                      {column.id === 'id' && customer.id}
                      {column.id === 'created_at' && customer.created_at}
                      {column.id === 'city' && customer.city}
                      {column.id === 'province' && customer.province}
                      {column.id === 'country' && customer.country}
                      {column.id === 'customer_status' && customer.customer_status}
                    </TableCell>
                  ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data?.total || 0}
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
