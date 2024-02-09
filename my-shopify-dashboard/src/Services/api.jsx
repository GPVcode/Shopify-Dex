import axios from 'axios';

const API_URL = `http://localhost:5000/api`

export const fetchTotalRevenue = async () => {
    try {
        // be courteous to user, use timeout.
        const response = await axios.get(`${API_URL}/total-revenue`, { timeout: 5000 });
       console.log("TotalRevenueResponse: ", response)
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

export const fetchRecentOrders = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/recent-orders`, { 
            params: {
                page: page,
                limit: limit,
            },
            timeout: 5000
        });

        if (response.data && Array.isArray(response.data.orders)) {
            return {
                orders: response.data.orders,
                total: response.data.total, // Assuming backend returns the total number of orders
                page,
                limit
            };
        } else {
            console.error("Invalid data format received:", response.data);
            return { error: "Invalid data format" };
        }
    } catch (error) {
        console.error('Error fetching recent orders:', error);
        return { error: "Failed to fetch data" };
    }
};

// Function to fetch inventory alerts
export const fetchInventoryAlerts = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/products/inventory-alerts`, { timeout: 5000 }); // 5000ms timeout

        // Basic Data Validation
        if (!response.data || !Array.isArray(response.data.items)) {
            throw new Error("Invalid pagination data format received");
        }

        return {
            items: response.data.items, 
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit 
        };
    } catch (error) {
      console.error('Error fetching inventory alerts:', error);
      return { error: "Failed to fetch data" };
      }
}

export const fetchProductsOverview = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/products/overview`, {
            params: { page, limit },
            timeout: 5000,
        });

        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid response data');
        }

        // Adjusting to the updated data structure
        const { detailedProducts, total, page: currentPage, limit: currentLimit } = response.data;

        // Further validation checks can be added here
        if (!Array.isArray(detailedProducts)) {
            throw new Error('Missing or invalid fields in response data');
        }

        // Return the validated data
        return { detailedProducts, total, currentPage, currentLimit };
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Fetch products overview timeout');
            throw new Error('Request timed out');
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.status, error.response.data);
            throw new Error(`Server error: ${error.response.status}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received for fetch products overview request');
            throw new Error('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
            throw new Error(error.message);
        }
    }
};

// Define the function to fetch traffic sources from the backend
export const fetchTrafficSources = async () => {
    try {
        const response = await axios.get(`${API_URL}/traffic-sources`);

        return response.data.traffic_sources;
    } catch (error) {
        console.error('There was a problem fetching the traffic sources:', error);
        throw error; // Or handle this more gracefully in your UI
    }
};

export const fetchCustomerInsights = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/customers/customer-insights`, {
            params: { page, limit },
            timeout: 5000,
        });

        // Basic Data Validation
        if (response.data && typeof response.data === 'object' && Array.isArray(response.data.customers)) {
            return {
                customers: response.data.customers,
                total: response.data.total,
                page: response.data.page,
                limit: response.data.limit,
                totalPages: response.data.totalPages
            };
        } else {
            console.error("Invalid data format received:", response.data);
            return { error: "Invalid data format" };
        }
    } catch (error) {
        console.error('There was a problem fetching customer insights:', error);
        return { error: "Failed to fetch data" };
    }
};

export const fetchProductPerformance = async () => {
    try {
        const response = await axios.get(`${API_URL}/product-performance`, { timeout: 5000 });
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error("Invalid data format received:", response.data);
            return { error: "Invalid data format" };
        }
    } catch (error) {
        console.error('Error fetching product performance:', error);
        return { error: "Failed to fetch data" };
    }
};

fetchProductPerformance();