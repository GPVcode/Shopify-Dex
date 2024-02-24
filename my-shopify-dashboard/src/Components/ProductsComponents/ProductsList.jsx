import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProductsList } from '../../Services/api';
import {
  CircularProgress, Box, Typography, Table, TableBody, TableCell, 
  TableHead, TableRow, IconButton, TablePagination, Tooltip, TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { red, green, yellow, orange } from '@mui/material/colors';
import ProductsColumnPreferences from './ProductsColumnPreferences';
import SearchBar from './SearchBar';
import { filterProducts } from './utils/filterProducts';
import SortIcon from '@mui/icons-material/Sort'; // Import Sort icon
import InventoryIcon from '@mui/icons-material/Inventory';

const initialColumns = [
  { id: 'title', label: 'Title', visible: true },
  { id: 'sku', label: 'SKU', visible: true },
  { id: 'stock', label: 'Stock/Restock', visible: true },
  { id: 'reorder_level', label: 'Reorder Level', visible: true },
  { id: 'trend', label: 'Trend', visible: true },
  { id: 'actions', label: 'Actions', visible: true },
  { id: 'supplier_name', label: 'Supplier Name', visible: false },
  { id: 'last_ordered_date', label: 'Last Ordered Date', visible: false },
  { id: 'lead_time_days', label: 'Lead Time (Days)', visible: false },
  { id: 'projected_runout_date', label: 'Projected Runout Date', visible: false },
  { id: 'variant_title', label: 'Variant', visible: false },
  { id: 'sales_velocity', label: 'Sales Velocity', visible: false },
  { id: 'profit_margin', label: 'Profit Margin', visible: false },
  { id: 'price', label: 'Price', visible: false },
  { id: 'category', label: 'Category', visible: false },
  { id: 'description', label: 'Description', visible: false },
];

// Initial user preferences for column visibility
const initialUserPreferences = {
  visible_columns: ['title', 'sku', 'stock', 'reorder_level', 'trend', 'actions'],
};

const getTrendIndicatorIcon = (stock, reorderLevel) => {
  let trendIndicator;
  if (stock < reorderLevel) {
    trendIndicator = 'critical';
  } else if (stock <= reorderLevel + 5) {
    trendIndicator = 'decreasing';
  } else {
    trendIndicator = 'stable'; // Placeholder
  }

  switch (trendIndicator) {
    case 'critical':
      return <Tooltip title="Critical"><WarningIcon sx={{ color: red[500], verticalAlign: 'middle' }} /></Tooltip>;
    case 'decreasing':
      return <Tooltip title="Decreasing"><WarningIcon sx={{ color: yellow[800], verticalAlign: 'middle' }} /></Tooltip>;
    case 'stable':
      return <Tooltip title="Stable"><CheckCircleIcon sx={{ color: green[500], verticalAlign: 'middle' }} /></Tooltip>;
    case 'increasing':
      return <Tooltip title="Increasing"><CheckCircleIcon sx={{ color: orange[500], verticalAlign: 'middle' }} /></Tooltip>;
    default:
      return null;
  }
};

const ProductsList = () => { 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [columns, setColumns] = useState(initialColumns);
  const [userPreferences, setUserPreferences] = useState(initialUserPreferences);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false); 

  const { data, isLoading, isError, error } = useQuery(
    ['ProductsList', page, rowsPerPage, searchQuery],
    async () => {
      setIsSearching(true); 
    
      const response  = await fetchProductsList(page + 1, rowsPerPage, searchQuery);

      setIsSearching(false);
      return response.products ? response.products : [];
    },
    { 
      keepPreviousData: true,
      // This onSuccess callback can help verify the data structure
      onSuccess: (data) => {
        console.log("Fetched Products List data: ", data);
      }
    }
  );        
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress size={10} /></Box>;
  if (isError) return <Typography color="error">Error: {error.message}</Typography>;
  const filteredProducts = filterProducts(data || [], searchQuery);

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
              <Typography variant="h4">Product List</Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'left', 
              alignItems: 'center', 
              flexWrap: 'wrap',
              gap: 2,
            }}>
              <Box>
              <TextField
                onSearch={setSearchQuery}
                size="small" 
                isLoading={isSearching}
                sx={{
                  '.MuiOutlinedInput-root': {
                    borderRadius: '50px', // Apply border-radius to the input field
                  },
                }}
                placeholder='Search...'
              />
              </Box>

              <ProductsColumnPreferences
                open={preferencesOpen}
                onClose={() => setPreferencesOpen(false)}
                availableColumns={columns}
                userPreferences={userPreferences}
                setUserPreferences={setUserPreferences}
              />
              <InventoryIcon />
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
              {filteredProducts.map(product => (
                <TableRow key={product.product_id}>
                  {columns.filter(column => userPreferences.visible_columns.includes(column.id)).map(column => (
                    <TableCell key={column.id}>
                      {column.id === 'title' && product.title}
                      {column.id === 'sku' && product.sku}
                      {column.id === 'stock' && `${product.stock}/${product.reorder_level}`}
                      {column.id === 'reorder_level' && `${product.reorder_level}`}
                      {column.id === 'trend' && getTrendIndicatorIcon(product.stock, product.reorder_level)}
                      {column.id === 'actions' && (
                        <>
                          <IconButton aria-label="view">
                            <VisibilityIcon sx={{ color: green[500] }} />
                          </IconButton>
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="order">
                            <AddShoppingCartIcon />
                          </IconButton>
                        </>
                      )}
                      {column.id === 'supplier_name' && `${product.supplier_name}`}
                      {column.id === 'last_ordered_date' && `${product.last_ordered_date}`}
                      {column.id === 'lead_time_days' && `${product.lead_time_days}`}
                      {column.id === 'projected_runout_date' && `${product.projected_runout_date}`}
                      {column.id === 'variant_title' && `${product.variant_title}`}
                      {column.id === 'sales_velocity' && `${product.sales_velocity}`}
                      {column.id === 'profit_margin' && `${product.profit_margin}`}
                      {column.id === 'price' && `${product.price}`}
                      {column.id === 'category' && `${product.category}`}
                      {column.id === 'description' && `${product.description}`}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <TablePagination
              component="div"
              count={filteredProducts.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}

      </Box>
    
  );
};

export default ProductsList;
