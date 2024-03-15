import axios from 'axios';

const API_URL = `http://localhost:5000/api`;

// Modified to accept selectedReports as a parameter
export const fetchDexAnalysis = async (selectedReports) => {
    try {
        console.log("REPORTS: ", selectedReports)
        const response = await axios.post(`${API_URL}/dexanalysis`, { reports: selectedReports });
        
        return response; 
    } catch (error) {
        console.error('Error fetching dex analysis:', error);
        throw error; 
    }
};
