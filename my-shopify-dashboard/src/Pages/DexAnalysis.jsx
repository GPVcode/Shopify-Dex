// Pages/DexAnalysis.js
import React, { useState } from 'react';
import { 
  Alert,
  Typography, 
  Container, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, Box, 
  Button, Stack 
} from '@mui/material';
import { fetchDexAnalysis } from '../Services/DexAnalysis';

const analysisOptions = [
  { value: 'salesForecasting', label: 'Sales Forecasting' },
  { value: 'customerSegmentation', label: 'Customer Segmentation' },
  { value: 'churnPrediction', label: 'Churn Prediction' },
];

const analysisDetails = {
  salesForecasting: 'Utilizing historical sales data to predict future sales...',
  customerSegmentation: 'Analyzing customer data to group customers into segments...',
  churnPrediction: 'Identifying customers who are at risk of stopping their purchases...',
  
};

const DexAnalysis = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [analysisResponse, setAnalysisResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleReportChange = (event) => {
    const value = event.target.value;
    setSelectedReports((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (selectedReports.length === 0) {
      setErrorMessage("Please select at least one report for analysis.");
      return;
    }
    try {
      const response = await fetchDexAnalysis(selectedReports);
      setAnalysisResponse(response);
      setErrorMessage(""); 
    } catch (error) {
      console.error('Error fetching dex analysis:', error);
      setErrorMessage("Failed to fetch analysis. Please try again."); // Set a generic error message on API call failure
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom component="div">
        DexAnalysis Reports
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        Select reports to include in your analysis:
      </Typography>
      <FormGroup>
        {analysisOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={<Checkbox checked={selectedReports.includes(option.value)} onChange={handleReportChange} value={option.value} />}
            label={option.label}
          />
        ))}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleSubmit}>Submit Reports</Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>
      </FormGroup>

      {analysisResponse && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Analysis Response
          </Typography>
          <Typography>{analysisResponse}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default DexAnalysis;
