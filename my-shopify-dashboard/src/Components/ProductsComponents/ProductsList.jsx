import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchProductsList } from '../../Services/api'; // Adjust the import path as needed
import {
  CircularProgress,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Tooltip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red, yellow } from '@mui/material/colors';

const getTrendIndicatorIcon = (stock, reorderLevel) => {
  const trendIndicator = stock <= reorderLevel ? 'critical' : 'stable'; // Simplified for demonstration
  switch (trendIndicator) {
    case 'critical':
      return <Tooltip title="Critical"><WarningIcon sx={{ color: red[500], verticalAlign: 'middle' }} /></Tooltip>;
    case 'stable':
      return <Tooltip title="Stable"><CheckCircleIcon sx={{ color: green[500], verticalAlign: 'middle' }} /></Tooltip>;
    default:
      return null;
  }
};

const ProductsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isError, error } = useQuery(
    ['ProductsList', page, rowsPerPage],
    () => fetchProductsList(page + 1, rowsPerPage),
    {
      keepPreviousData: true,
    }
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

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
  }}>      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>

      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Products List</Typography>
      <IconButton aria-label="settings">
          <SettingsIcon />
        </IconButton>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock Level</TableCell>
              <TableCell>Trend</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{`${product.stock}/${product.reorder_level}`}</TableCell>
                <TableCell>{getTrendIndicatorIcon(product.stock, product.reorder_level)}</TableCell>
                <TableCell>
                  <IconButton aria-label="view">
                    <VisibilityIcon sx={{ color: green[500] }} />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="order" onClick={() => console.log('Order', product.product_id)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data?.totalProducts || 0}
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
          </TableBody>
        </Table>

    </Box>
  );
};

export default ProductsList;
