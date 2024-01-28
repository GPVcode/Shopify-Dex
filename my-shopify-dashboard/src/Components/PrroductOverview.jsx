import React from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../Services/api'; // Replace './api' with the actual path
import { CircularProgress, Card, CardContent, Typography, Grid, Box } from '@mui/material';

export const ProductOverview = () => {
    const { data: products, isLoading, isError } = useQuery('products', fetchProducts);

    if (isLoading) {
        return <Box style={{ padding: '20px', margin: '10px' }}><CircularProgress /></Box>;
    }

    if (isError || !products) {
        return <Box style={{ padding: '20px', margin: '10px' }}><Typography variant="h6">Failed to load products.</Typography></Box>;
    }

    return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Products Overview</Typography>
        <Grid container spacing={2}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{product.name}</Typography>
                            <Typography color="textSecondary">Stock: {product.stockLevel}</Typography>
                            <Typography color="primary">Sales: {product.sales}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </Box>
    );
};
