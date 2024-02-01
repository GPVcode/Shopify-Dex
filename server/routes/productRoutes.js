import express from 'express';
const router = express.Router();
import { fetchInventoryAlerts } from '../utils/shopifyAPI.js';

// Route for fetching inventory alerts
router.get('/inventory-alerts', async (req, res) => {
    try {
        const inventoryAlerts = await fetchInventoryAlerts();
        res.json(inventoryAlerts);
    } catch (error) {
        res.status(500).send('Server error while fetching inventory alerts');
    }
});

export default router;
