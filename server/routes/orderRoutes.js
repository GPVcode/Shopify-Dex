import express from 'express';
const router = express.Router();
import { 
    fetchTotalRevenue, 
    fetchRecentOrders, 
    fetchAllOrdersCount, 
    fetchTrafficSources,
    fetchProductPerformance
} from '../utils/shopifyAPI.js';

router.get('/total-revenue', async (req, res) => {
    try{
        const { totalRevenue, monthlyRevenue, dailyRevenue } = await fetchTotalRevenue();
        res.json({ totalRevenue, monthlyRevenue, dailyRevenue });
    } catch(error){
        res.status(500).json({ message: 'Error fetching total revenue.'})
    }
});

router.get('/recent-orders', async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const orders = await fetchRecentOrders(page, limit);
        // const totalOrdersCount = await fetchAllOrdersCount(); 
        // const page = 1;
        // const limit = 10;
        // const orders = `await fetchRecentOrders(page, limit);`
        // const totalOrdersCount = 10
        // console.log("orders: ", orders)
        // console.log("totalOrdersCount: ", totalOrdersCount)
        res.json({ 
            orders,
            page,
            limit
        });
    } catch(error){
        res.status(500).json({ message: 'Error fetching recent orders.'})
    }
});

router.get('/total-orders', async (req, res) => {
    try{
        const totalOrdersCount = await fetchAllOrdersCount();

        res.json({
            totalOrdersCount
        })
    } catch(error){
        res.status(500).json({ message: 'Error fetching total orders from Shopify.'})
    }
})
router.get('/traffic-sources', async (req, res) => {

    try{
        const trafficSources = await fetchTrafficSources();
        res.json( trafficSources );
    } catch(error){
        res.status(500).json({ message: 'Error fetching total revenue.'})
    }
});

router.get('/product-performance', async (req, res) => {
    try {
        const productPerformanceData = await fetchProductPerformance();
        res.json(productPerformanceData);
    } catch (error) {
        console.error('Failed to fetch product performance:', error);
        res.status(500).json({ message: 'Error fetching product performance.' });
    }
});
export default router;