import React from 'react';
import { Card, Grid, Typography, Toolbar, Box } from '@mui/material';
import ProductsList from '../Components/ProductsComponents/ProductsList';

const Products = () => {

    return (
    <>        
        <Box sx={{ flexGrow: 1, mt: 4, ml: 1, mr: 1, mb: 3, overflowY: 'auto' }}>
            {/* <Box sx={{ flexGrow: 1, marginBottom: 1 }}>   
                <Toolbar disableGutters>
                    <Typography variant="h3" sx={{ flexGrow: 1, mt: 1, mb: 1, color: '#ffffff' }}>
                        Products Management
                    </Typography>
                </Toolbar>
            </Box> */}

            <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card 
                        style={{ 
                        height: '100%', 
                        display: 'flex', flexDirection: 'column', 
                        overflow: 'auto', borderRadius: "12px",
                        border: '1px solid #232f3e'
                    }}>
                        <ProductsList />
                    </Card>
                </Grid>
            </ Grid>
            </Box>

        </Box>

      </>
    );
};

export default Products;
