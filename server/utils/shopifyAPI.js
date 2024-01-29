import express from 'express';
import axios from 'axios';

const { SHOP_URL, SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD } = process.env;


export const fetchTotalRevenue = async (req, res, next) => {
    try {
        // const url = `https://${SHOP_URL}/admin/api/2024-01/orders.json`;
        // const auth = {
        //     username: SHOPIFY_API_KEY,
        //     password: SHOPIFY_API_PASSWORD
        // };

        // const response = await axios.get(url, { auth });
        // const orders = response.data.orders;

        // let totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
        // return totalRevenue;
        // Mimicking Shopify API response
        const response = {
            data: {
                orders: [
                    { id: 101, name: "Order 1", total_price: 150.00, created_at: "2024-01-01T10:00:00-05:00" },
                    { id: 102, name: "Order 2", total_price: 200.00, created_at: "2024-01-02T11:00:00-05:00" },
                    { id: 103, name: "Order 3", total_price: 350.00, created_at: "2024-01-03T12:00:00-05:00" },
                    { id: 104, name: "Order 4", total_price: 400.00, created_at: "2024-01-04T13:00:00-05:00" },
                    { id: 105, name: "Order 5", total_price: 500.00, created_at: "2024-01-05T14:00:00-05:00" }
                ]
            }
        };
        const orders = response.data.orders;

        let totalRevenue = 0;
        orders.forEach(order => {
            totalRevenue += order.total_price;
        });

        return totalRevenue;
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        throw error;
    }
};

export const fetchRecentOrders = async () => {
    try {
        // const url = `https://${SHOP_URL}/admin/api/2024-01/orders.json?limit=10&order=created_at%20desc`
        // const auth = {
        //     username: SHOPIFY_API_KEY,
        //     password: SHOPIFY_API_PASSWORD
        // };

        // const response = await axios.get(url, { auth });
        // return response.data.orders;
        const response = {
            data: {
                orders: [
                    { 
                        id: 1001, 
                        customer: { first_name: "John", last_name: "Doe" }, 
                        total_price: "150.00", 
                        financial_status: "Paid"
                    },
                    { 
                        id: 1002, 
                        customer: { first_name: "Jane", last_name: "Smith" }, 
                        total_price: "200.00", 
                        financial_status: "Pending"
                    },
                    { 
                        id: 1003, 
                        customer: { first_name: "Alice", last_name: "Johnson" }, 
                        total_price: "350.00", 
                        financial_status: "Refunded"
                    },
                ]
            }
        };

        return response.data.orders;
    } catch(error){
        console.error('Error fetching recent orders:', error);
        throw error;
    }
};