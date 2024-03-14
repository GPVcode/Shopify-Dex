import express, { json } from 'express';
import cors from 'cors';
import revenueRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', revenueRoutes);
app.use('/api/products', productRoutes)
app.use('/api/customers', customerRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
// Hello