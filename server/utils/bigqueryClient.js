// server/utils/bigqueryClient.js
import {BigQuery} from '@google-cloud/bigquery';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to service account key file

const keyFilename = path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Create a BigQuery client with credentials
const bigQueryClient = new BigQuery({
    keyFilename
});

export default bigQueryClient;
