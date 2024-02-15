import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProductsList } from '../../Services/api.jsx';
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
  TablePagination
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { green } from '@mui/material/colors';

const ProductsList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isError, error } = useQuery(
    ['ProductsList', { page, rowsPerPage }],
    () => fetchProductsList({ page: page + 1, limit: rowsPerPage }),
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
    <Box sx={{ padding: '20px', margin: '10px' }}>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Products List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.products?.map((product) => ( // Check for data and products existence
              <TableRow key={product.product_id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" onClick={() => console.log('View', product.product_id)}>
                    <VisibilityIcon sx={{ color: green[500] }} />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => console.log('Edit', product.product_id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => console.log('Delete', product.product_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.totalProducts || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
  );
};

export default ProductsList;
