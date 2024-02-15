import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
// import SearchBar from './components/SearchBar';
// import FilterOptions from './components/FilterOptions';
import ProductsList from '../Components/ProductsComponents/ProductsList';
const Products = () => {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" gutterBottom>
                    Products Management
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            {/* Search and Filter Section */}
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        {/* <SearchBar /> */}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {/* <FilterOptions /> */}
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* ProductsList Section */}
                            <ProductsList />

                            {/* Pagination Section can be part of ProductsList or a separate component here */}
                        </Paper>
                    </Grid>
                    
                    {/* Additional components related to products could go here */}
                    {/* Example: Analytics or Insights about the products */}
                </Grid>
            </Box>
        </Container>
    );
};

export default Products;
