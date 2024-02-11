import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInventoryAlerts } from '../Services/api';
import { CircularProgress, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, TableFooter, TablePagination, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarningIcon from '@mui/icons-material/Warning'; // Import warning icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import check circle icon
import ColumnPreferences from './ColumnPreferences';
import { green, yellow, red } from '@mui/material/colors'; // Import colors

const getTrendIndicatorIcon = (trendIndicator) => {
  switch (trendIndicator) {
    case 'critical':
      return <Tooltip title="Critical"><WarningIcon sx={{ color: red[500], verticalAlign: 'middle' }} /></Tooltip>;
    case 'decreasing':
      return <Tooltip title="Decreasing"><WarningIcon sx={{ color: yellow[800], verticalAlign: 'middle' }} /></Tooltip>;
    case 'stable':
      return <Tooltip title="Stable"><CheckCircleIcon sx={{ color: green[500], verticalAlign: 'middle' }} /></Tooltip>;
    case 'increasing':
      return <Tooltip title="Increasing"><CheckCircleIcon sx={{ color: green[500], verticalAlign: 'middle' }} /></Tooltip>;
    default:
      return null;
  }
};

// Function to calculate the trend_indicator
const calculateTrendIndicator = (stock, reorderLevel) => {
  if (stock < reorderLevel) return 'critical';
  if (stock === reorderLevel) return 'stable';
  const percentageAboveReorderLevel = (stock - reorderLevel) / reorderLevel;
  if (percentageAboveReorderLevel <= 0.1) return 'decreasing';
  return 'increasing';
};

const handleOrderClick = (product) => {
  console.log('Ordering process for:', product);
};

const InventoryAlerts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isError, error } = useQuery(['Inventory Alerts', page, rowsPerPage], () => fetchInventoryAlerts(page + 1, rowsPerPage));

  const [userPreferences, setUserPreferences] = useState({ 
    visible_columns: [
      "title", 
      "stock",
      "trend_indicator",
      "action"
    ] 
  });
  
  // Handle change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };


  if (isLoading){
      return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
  } 
  if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
  
  // Assuming inventory is part of the data. This is for UX (give empty instead of error in event there is no data)
  const inventory = data?.items || [];
  const totalCount = data?.total || 0;

  // Calculate trend_indicator for each inventory item
  const inventoryWithTrend = inventory.map(item => ({
    ...item,
    trend_indicator: calculateTrendIndicator(item.stock, item.reorder_level),
  }));

  // Define the columns for preferences
  const availableColumns = [
    { id: 'title', label: 'Product Name' },
    { id: 'sku', label: 'SKU' },
    { id: 'stock', label: 'Stock' },
    { id: 'reorder_level', label: 'Reorder Level' },
    { id: 'trend_indicator', label: 'Trend Indicator' },
    { id: 'action', label: 'Order' },
    { id: 'supplier_name', label: 'Supplier' },
    { id: 'last_ordered_date', label: 'Last Ordered' },
    { id: 'lead_time_days', label: 'Lead Time (Days)' },
    { id: 'projected_runout_date', label: 'Projected Runout' }
  ]; 

  const cellStyle = {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="h5"
                style={{ marginBottom: '20px' }}
              >Inventory Alerts
              </Typography>
              <ColumnPreferences 
                availableColumns={availableColumns} 
                userPreferences={userPreferences} 
                setUserPreferences={setUserPreferences} 
              />
            </div>
            
            <Table size="small">
                  <TableHead>
                    <TableRow>
                      {availableColumns.map(column => (
                        userPreferences.visible_columns.includes(column.id) && <TableCell style={cellStyle} key={column.id}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {inventoryWithTrend.map((item, index) => (
                    <TableRow key={index}>
                      {availableColumns.map(column => (
                        userPreferences.visible_columns.includes(column.id) &&
                        <TableCell style={cellStyle} key={column.id}>
                          {column.id === 'action' ? 
                            <IconButton 
                              variant="outlined" 
                              color="primary" 
                              onClick={() => handleOrderClick(item)}
                              size="small"
                            >
                              <AddShoppingCartIcon  />
                            </IconButton>
                            :
                            column.id === 'trend_indicator' ? getTrendIndicatorIcon(item[column.id]) : item[column.id]
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  </TableBody>
                  <TableFooter>
                        <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={totalCount}
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
  )
}

export default InventoryAlerts

