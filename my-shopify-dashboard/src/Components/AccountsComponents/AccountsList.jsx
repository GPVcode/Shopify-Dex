import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomerInsights } from '../../Services/api';
import {
  CircularProgress, Box, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, TablePagination, TextField, Alert, TableSortLabel,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountsColumnPreferences from './AccountsColumnPreferences';
import { filterAccounts } from './utils/filterAccounts';

const initialColumns = [
  { id: 'name', label: 'Name', visible: true },
  { id: 'email', label: 'Email', visible: true },
  { id: 'customer_status', label: 'Status', visible: true },
  { id: 'total_spent', label: 'Total Spent', visible: true },
  { id: 'ordersCount', label: 'Orders Count', visible: false },
  { id: 'id', label: 'ID', visible: false },
  { id: 'created_at', label: 'Created At', visible: false },
  { id: 'city', label: 'City', visible: false },
  { id: 'province', label: 'Province', visible: false },
  { id: 'country', label: 'Country', visible: false },
];

const initialUserPreferences = {
  visible_columns: ['name', 'email', 'customer_status', 'total_spent'],
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

  return <span style={{ color }}>{status}</span>;
};

const AccountsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const [userPreferences, setUserPreferences] = useState(initialUserPreferences);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const { data = { customers: [] }, error, isLoading, isError } = useQuery(
    ['customerInsights', page, rowsPerPage],
    () => fetchCustomerInsights(page + 1, rowsPerPage),
    { keepPreviousData: true }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const filteredAndSortedData = React.useMemo(() => {
    let filtered = filterAccounts(data?.customers, searchQuery);
    if (sortConfig.key) {
      filtered = filtered.sort((a, b) => {
        // Special handling for numeric sorting of "total_spent"
        if (sortConfig.key === 'total_spent') {
          const aValue = parseFloat(a[sortConfig.key]);
          const bValue = parseFloat(b[sortConfig.key]);

          // Ascending sort
          if (sortConfig.direction === 'desc') {
            return aValue - bValue;
          }
          // Descending sort
          return bValue - aValue;
        }

        // Default sorting for other fields
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [data, sortConfig, searchQuery]);


  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.customers) {
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
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between', 
          marginBottom: '2rem', 
          gap: 2,
        }}>
        <Typography variant="h4">Accounts</Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'left', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: 2, 
        }}>
          <TextField 
            size="small"
            sx={{ '.MuiOutlinedInput-root': { borderRadius: '50px' } }}
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AccountsColumnPreferences 
            open={preferencesOpen}
            onClose={() => setPreferencesOpen(false)}
            columns={columns}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
            setColumns={setColumns}
          />
          <AccountCircleIcon />
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {columns.filter(column => userPreferences.visible_columns.includes(column.id)).map(column => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={sortConfig.key === column.id}
                  direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAndSortedData.map((customer) => {
            return (
              <TableRow key={customer.id}>
                {columns.filter(column => userPreferences.visible_columns.includes(column.id)).map(column => {
                  const cellValue = column.id === 'total_spent'
                  ? `$${customer[column.id]}`
                  : customer[column.id];

                  return (
                    <TableCell key={column.id}>
                      {column.id === 'customer_status' ? getStatusStyles(customer[column.id]) : cellValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
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
