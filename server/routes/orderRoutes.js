import express from 'express';
const router = express.Router();
import { fetchTotalRevenue, fetchRecentOrders, fetchAllOrdersCount } from '../utils/shopifyAPI.js';

router.get('/total-revenue', async (req, res) => {

    try{
        const { totalRevenue, monthlyRevenue } = await fetchTotalRevenue();
        console.log("REVVVV: ", totalRevenue)
        console.log("MUNNNTH: ", monthlyRevenue)

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


export default router;