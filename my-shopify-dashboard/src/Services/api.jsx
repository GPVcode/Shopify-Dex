import axios from 'axios';

const API_URL = `https://shopidex.onrender.com/api`

export const fetchTotalRevenue = async () => {
    try {

        const response = await axios.get(`${API_URL}/total-revenue`, { timeout: 5000 });

        console.log("Total Revenue Data: ", response)
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
                total: response.data.total,
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
        const response = await axios.get(`${API_URL}/products/inventory-alerts`, { timeout: 5000 }); 

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

        const { detailedProducts, total, page: currentPage, limit: currentLimit } = response.data;

        if (!Array.isArray(detailedProducts)) {
            throw new Error('Missing or invalid fields in response data');
        }
        return { detailedProducts, total, currentPage, currentLimit };
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Fetch products overview timeout');
            throw new Error('Request timed out');
        } else if (error.response) {
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
        throw error; // Or handle this more gracefully in UI
    }
};

export const fetchCustomerInsights = async (page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${API_URL}/customers/customer-insights`, {
            params: { page, limit },
            timeout: 5000,
        });

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

export const fetchUserEngagementMetrics = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers/user-engagement-metrics`, { timeout: 5000 });
        if (response.data && typeof response.data === 'object' && Array.isArray(response.data.data)) {
            return {
                data: response.data.data,
                status: response.data.status,
                message: response.data.message,
            };
        } else {
            console.error("Invalid data format received:", response.data);
            return { error: "Invalid data format" };
        }
    } catch (error) {
        console.error('Error fetching user engagement metrics:', error);
        return { error: "Failed to fetch data" };
    }
};

export const fetchProductsList = async (page = 1, limit = 10, searchQuery = '') => {
    try {
        const response = await axios.get(`${API_URL}/products/products-list`, {
            params: { page, limit, search: searchQuery },
            timeout: 5000
        });
        if (response.data && typeof response.data === 'object') {
            if (Array.isArray(response.data.products) && 
                typeof response.data.totalProducts === 'number' && 
                typeof response.data.totalPages === 'number') {
                return response.data;
            } else {
                console.error("Invalid data format received:", response.data);
                return { error: "Invalid data format" };
            }
        } else {
            console.error("Invalid response structure:", response);
            return { error: "Invalid response structure" };
        }
    } catch (error) {
        console.error('Error fetching products list:', error);
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return { error: "Request timed out" };
        } else if (error.response) {
            console.error('Server error:', error.response.status);
            return { error: `Server responded with status: ${error.response.status}` };
        } else {
            return { error: "Failed to fetch data" };
        }
    }
};


// export const fetchUserPreferences = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products/preferences`);
//         return response.data; 
//     } catch (error) {
//         console.error('Error fetching user preferences:', error);
//         return { error: "Failed to fetch user preferences" };
//     }
// };

// export const updateUserPreferences = async (preferences) => {
//     try {
//         const response = await axios.post(`${API_URL}/products/preferences/update`, preferences);
//         return response.data; 
//     } catch (error) {
//         console.error('Error updating user preferences:', error);
//         return { error: "Failed to update user preferences" };
//     }
// };
