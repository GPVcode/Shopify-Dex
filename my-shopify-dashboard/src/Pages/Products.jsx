import React from 'react';
import { Container, Grid, Typography, Toolbar, Box } from '@mui/material';
import ProductsList from '../Components/ProductsComponents/ProductsList';

const Products = () => {

    return (
    <div>        
            <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                <Toolbar disableGutters>
                    <Typography variant="h3" sx={{ flexGrow: 1, marginTop: 1, color: '#2C2C2E' }}>
                        Products Management
                    </Typography>
                </Toolbar>
            </Box>

            <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ProductsList />
                </Grid>
            </Grid>
            </Box>

      </div>
    );
};

export default Products;
