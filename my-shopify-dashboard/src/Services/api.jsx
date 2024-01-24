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


