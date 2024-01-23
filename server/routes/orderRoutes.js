import express from 'express';
const router = express.Router();

// DUMMY TOTAL REVENUE
const totalRevenue = { totalRevenue: 100000 };

router.get('/total', (req, res) => {
    // Dummy data for total revenue
    res.json(totalRevenue);
});

export default router;