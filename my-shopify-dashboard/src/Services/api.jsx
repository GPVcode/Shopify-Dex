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

export const fetchRecentOrders = async () => {
    try {
        // Simulate network request delay
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                // Dummy data mimicking Shopify's order data structure
                const dummyData = {
                    orders: [
                        {
                            id: 123456,
                            customer: {
                                first_name: "John",
                                last_name: "Doe"
                            },
                            total_price: "100.00",
                            financial_status: "paid",
                            created_at: "2024-01-20T12:34:56-04:00"
                        },
                        {
                            id: 789012,
                            customer: {
                                first_name: "Jane",
                                last_name: "Doe"
                            },
                            total_price: "200.00",
                            financial_status: "paid",
                            created_at: "2024-01-22T14:30:22-04:00"
                        },
                        {
                            id: 789013,
                            customer: {
                                first_name: "Jane",
                                last_name: "Doe2"
                            },
                            total_price: "200.00",
                            financial_status: "paid",
                            created_at: "2024-01-22T14:30:22-04:00"
                        }
                        // Add more orders as needed for testing
                    ]
                };

                resolve({ data: dummyData });
            }, 1000); // Simulated delay of 1 second
        });

        // Validate the data structure
        if (response.data && Array.isArray(response.data.orders)) {
            return response.data;
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
        const response = await new Promise((resolve) => {
            setTimeout(() => {
            // Dummy data for low-stock inventory items
            const dummyInventoryData = [
                { id: '1', productName: 'Classic White T-Shirt', sku: 'CWT-001', stockLevel: 5, lowStockThreshold: 10 },
                { id: '2', productName: 'Black Denim Jeans', sku: 'BDJ-002', stockLevel: 3, lowStockThreshold: 10 },
                { id: '3', productName: 'Red Woolen Hat', sku: 'RWH-003', stockLevel: 2, lowStockThreshold: 5 },
                { id: '4', productName: 'Blue Canvas Shoes', sku: 'BCS-004', stockLevel: 4, lowStockThreshold: 5 },
                { id: '5', productName: 'Leather Wristwatch', sku: 'LWW-005', stockLevel: 6, lowStockThreshold: 10 }
                ];
            resolve(dummyInventoryData);
            }, 1000);
        });

        const lowStockItems = response.filter(item => item.stockLevel <= item.lowStockThreshold);
        return lowStockItems;
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
