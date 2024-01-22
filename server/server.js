import express, { json } from 'express';
import axios from 'axios';
import qs from 'qs';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});