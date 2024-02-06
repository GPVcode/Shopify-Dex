import express from 'express';
const router = express.Router();
import { fetchTotalRevenue, fetchRecentOrders, fetchAllOrdersCount, fetchTrafficSources } from '../utils/shopifyAPI.js';

router.get('/total-revenue', async (req, res) => {

    try{
        const { totalRevenue, monthlyRevenue } = await fetchTotalRevenue();

        res.json({ totalRevenue, monthlyRevenue });
    } catch(error){
        res.status(500).json({ message: 'Error fetching total revenue.'})
    }
});

router.get('/recent-orders', async (req, res) => {

    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const orders = await fetchRecentOrders(page, limit);

        const totalOrdersCount = await fetchAllOrdersCount(); 
        res.json({ 
            orders: orders,
            total: totalOrdersCount
        });
    } catch(error){
        res.status(500).json({ message: 'Error fetching recent orders.'})
    }
});

router.get('/traffic-sources', async (req, res) => {

    try{
        const trafficSources = await fetchTrafficSources();
        console.log("HAAAA: ", trafficSources)
        res.json( trafficSources );
    } catch(error){
        res.status(500).json({ message: 'Error fetching total revenue.'})
    }
});


export default router;