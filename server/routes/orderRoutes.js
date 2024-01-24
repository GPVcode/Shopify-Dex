import express from 'express';
const router = express.Router();
import { fetchTotalRevenue } from '../utils/shopifyAPI.js';

// DUMMY TOTAL REVENUE

router.get('/total', async (req, res) => {
    try{
        const totalRevenue = await fetchTotalRevenue();
        res.json({totalRevenue});
    } catch(error){
        res.status(500).json({ message: 'Error fetching ttoal revenue.'})
    }
});

export default router;