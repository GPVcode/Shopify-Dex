// routes/aiAnalysisRoutes.js
import express from 'express';
const router = express.Router();

// You may need to adjust the path to your Python script accordingly
const PYTHON_SCRIPT_PATH = '../path/to/your/python/script.py';

// Route for AI Analysis
router.post('/dexanalysis', async (req, res) => {
    const { selectedReports } = req.body;
    
    // Logic to call Python script with selectedReports as input
    // and fetch the analysis result to send back to frontend
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python', [PYTHON_SCRIPT_PATH, JSON.stringify(selectedReports)]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.json({ message: data.toString() });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ error: data.toString() });
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

export default router;