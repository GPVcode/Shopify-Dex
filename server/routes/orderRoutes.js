import express from 'express';
const router = express.Router();
import { fetchTotalRevenue, fetchRecentOrders } from '../utils/shopifyAPI.js';

router.get('/total-revenue', async (req, res) => {
    try{
        const totalRevenue = await fetchTotalRevenue();
        res.json({ totalRevenue });
    } catch(error){
        res.status(500).json({ message: 'Error fetching total revenue.'})
    }
});

router.get('/recent-orders', async (req, res) => {
    try{
        const orders = await fetchRecentOrders();
        res.json({ orders });
    } catch(error){
        res.status(500).json({ message: 'Error fetching recent orders.'})
    }
});


export default router;