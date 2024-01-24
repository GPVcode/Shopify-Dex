import axios from 'axios';

const API_URL = `http://localhost:3000/api/revenue`

export const fetchTotalRevenue = async () => {
    
    try {
        // be courteous to user, use timeout.
        const response = await axios.get(`${API_URL}/total`, { timeout: 5000 });
        // GPV, validate your data
        if (response.data && typeof response.data.totalRevenue === 'number') {
            return response.data;
        } else {
            console.error("Invalid data format received:", response.data);
            return { error: "Invalid data format" };
        }

    } catch (error) {
        console.error('Error feteching total revenue:', error);
        return { error: "Failed to fetch data" };
    }
    
};