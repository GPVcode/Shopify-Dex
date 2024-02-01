import axios from 'axios';

const API_URL = `http://localhost:5000/api`

export const fetchTotalRevenue = async () => {
    try {
        // be courteous to user, use timeout.
        const response = await axios.get(`${API_URL}/total-revenue`, { timeout: 5000 });
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
export const fetchInventoryAlerts = async () => {
    try {
        const response = await axios.get(`${API_URL}/inventory-alerts`, { timeout: 5000 }); // 5000ms timeout

        // Basic Data Validation
        if (!Array.isArray(response.data)) {
            throw new Error("Invalid data format received");
        }

        const validatedData = response.data.filter(item => 
            item.hasOwnProperty('product_id') &&
            item.hasOwnProperty('title') &&
            item.hasOwnProperty('sku') &&
            item.hasOwnProperty('stock') &&
            item.hasOwnProperty('reorder_level') &&
            item.hasOwnProperty('supplier_name') &&
            item.hasOwnProperty('last_ordered_date') &&
            item.hasOwnProperty('lead_time_days') &&
            item.hasOwnProperty('projected_runout_date') &&
            item.hasOwnProperty('variant_title') &&
            item.hasOwnProperty('trend_indicator')
        );


        console.log("HEERRROROOO!! ", validatedData)

        return validatedData;
    } catch (error) {
      console.error('Error fetching inventory alerts:', error);
      return { error: "Failed to fetch data" };
      }
}

export const fetchProducts = async () => {
    try {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                // Dummy data for products
                const dummyProductData = [
                    { id: '101', name: 'Eco-Friendly Sneakers', stockLevel: 15, sales: 200 },
                    { id: '102', name: 'Vintage Leather Wallet', stockLevel: 5, sales: 150 },
                    { id: '103', name: 'Organic Cotton T-Shirt', stockLevel: 20, sales: 300 },
                    { id: '104', name: 'Classic Aviator Sunglasses', stockLevel: 2, sales: 90 },
                    { id: '105', name: 'Handmade Clay Pottery', stockLevel: 8, sales: 50 }
                ];
                resolve(dummyProductData);
            }, 1000);
        });
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: "Failed to fetch data" };
    }
};
