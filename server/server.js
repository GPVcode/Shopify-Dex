import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';
import qs from 'qs';
import revenueRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());

// Routes
app.use('/api', revenueRoutes);
app.use('/api/products', productRoutes)
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});