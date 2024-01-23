import axios from 'axios';

const API_URL = `http://localhost:3000/api/revenue`

export const fetchTotalRevenue = async () => {
    const response = await axios.get(`${API_URL}/total`);
    return response.data;
}