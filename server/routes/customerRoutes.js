import express from 'express';
const router = express.Router();
import { 
    fetchCustomerInsights,
    fetchUserEngagementMetrics,
    fetchAccountTotal
} from '../utils/shopifyAPI.js';

router.get('/account-total', async (req, res) => {
    try {
        const AccountTotal = await fetchAccountTotal();
        
        res.json(AccountTotal);
    } catch (error) {
        console.error('Error fetching customer insights:', error.message);
        res.status(500).json({ message: 'Failed to fetch customer insights', error: error.message });
    }
})
router.get('/customer-insights', async (req, res) => {
    try {

        const queryParameters = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        };

        const insights = await fetchCustomerInsights(queryParameters);
        res.json(insights);
    } catch (error) {
        console.error('Error fetching customer insights:', error.message);
        res.status(500).json({ message: 'Failed to fetch customer insights', error: error.message });
    }
});

router.get('/user-engagement-metrics', async (req, res) => {
    try{
        const data = await fetchUserEngagementMetrics();
        res.json(data);

    } catch (error){
        res.status(500).json({ message: error.message });

    }
})
export default router;