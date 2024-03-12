import express from 'express';
const router = express.Router();
import { 
    fetchInventoryAlerts, 
    fetchProductsOverview, 
    fetchProductsList 
} from '../utils/shopifyAPI.js';

// Route for fetching inventory alerts
router.get('/inventory-alerts', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        // Pass the page and limit to the fetchInventoryAlerts function
        const { items, total, page: currentPage, limit: currentLimit } = await fetchInventoryAlerts(page, limit);

        // Return paginated inventory alerts along with pagination info
         res.json({
            items,
            total,
            page: currentPage,
            limit: currentLimit,
        });
    } catch (error) {
        res.status(500).send('Server error while fetching inventory alerts');
    }
});

router.get('/overview', async (req, res) => {
    try {
        // Fetch and process your products data from the database
        const productsData = await fetchProductsOverview(req.query);
        res.json(productsData);
    } catch (error) {
        console.error('Failed to fetch products overview:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/products-list', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const productsData = await fetchProductsList({ page, limit });

        // Return paginated products list along with pagination info
        res.json(productsData);

    } catch (error) {
        console.error('Failed to fetch products list:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
