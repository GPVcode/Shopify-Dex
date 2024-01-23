import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';
import qs from 'qs';
import revenueRoutes from './routes/orderRoutes.js'

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

// Routes
app.use('/api/revenue', revenueRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});