import express, { json } from 'express';
import cors from 'cors';
import revenueRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import aiAnalysisRoutes from './routes/aiAnalysisRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());

app.use('/api', revenueRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/dexanalysis', aiAnalysisRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});