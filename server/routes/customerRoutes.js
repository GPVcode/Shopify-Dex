import express from 'express';
const router = express.Router();
import { fetchCustomerInsights } from '../utils/shopifyAPI.js';

router.get('/customer-insights', async (req, res) => {
    try {
        const queryParameters = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 5
        };

        const insights = await fetchCustomerInsights(queryParameters);
        res.json(insights);
    } catch (error) {
        console.error('Error fetching customer insights:', error.message);
        res.status(500).json({ message: 'Failed to fetch customer insights', error: error.message });
    }
});

export default router;