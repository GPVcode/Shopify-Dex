import express from 'express';
import axios from 'axios';

const { SHOP_URL, SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD } = process.env;

// Mimicking Shopify API response
const ordersResponse = {
    orders: [
        {
            id: 1011,
            email: "alice@example.com",
            total_price: "120.00",
            financial_status: "Paid",
            order_date: "2024-01-10",
            customer: { first_name: "Alice", last_name: "Brown" },
            line_items: [
                {
                    id: 2011,
                    title: "Widget X",
                    quantity: 1,
                    price: "120.00",
                    variant_id: 3011,
                    variant_title: "Standard",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1012,
            email: "bob@example.com",
            total_price: "450.00",
            financial_status: "Pending",
            order_date: "2024-01-11",
            customer: { first_name: "Bob", last_name: "Davis" },
            line_items: [
                {
                    id: 2012,
                    title: "Widget Y",
                    quantity: 2,
                    price: "100.00",
                    variant_id: 3012,
                    variant_title: "Deluxe",
                    vendor: "Widgets Co"
                },
                {
                    id: 2013,
                    title: "Widget Z",
                    quantity: 1,
                    price: "250.00",
                    variant_id: 3013,
                    variant_title: "Advanced",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1013,
            email: "carol@example.com",
            total_price: "180.00",
            financial_status: "Refunded",
            order_date: "2024-01-12",
            customer: { first_name: "Carol", last_name: "Evans" },
            line_items: [
                {
                    id: 2014,
                    title: "Widget X",
                    quantity: 1,
                    price: "180.00",
                    variant_id: 3014,
                    variant_title: "Standard",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1014,
            email: "david@example.com",
            total_price: "210.00",
            financial_status: "Paid",
            order_date: "2024-01-13",
            customer: { first_name: "David", last_name: "Green" },
            line_items: [
                {
                    id: 2015,
                    title: "Widget A",
                    quantity: 1,
                    price: "90.00",
                    variant_id: 3015,
                    variant_title: "Compact",
                    vendor: "Widgets Co"
                },
                {
                    id: 2016,
                    title: "Widget B",
                    quantity: 2,
                    price: "60.00",
                    variant_id: 3016,
                    variant_title: "Portable",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1015,
            email: "eve@example.com",
            total_price: "300.00",
            financial_status: "Pending",
            order_date: "2024-01-14",
            customer: { first_name: "Eve", last_name: "Harris" },
            line_items: [
                {
                    id: 2017,
                    title: "Widget C",
                    quantity: 3,
                    price: "100.00",
                    variant_id: 3017,
                    variant_title: "Eco-Friendly",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1016,
            email: "frank@example.com",
            total_price: "150.00",
            financial_status: "Paid",
            order_date: "2024-01-15",
            customer: { first_name: "Frank", last_name: "Ivy" },
            line_items: [
                {
                    id: 2018,
                    title: "Widget D",
                    quantity: 1,
                    price: "150.00",
                    variant_id: 3018,
                    variant_title: "High-Performance",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1017,
            email: "grace@example.com",
            total_price: "400.00",
            financial_status: "Paid",
            order_date: "2024-01-16",
            customer: { first_name: "Grace", last_name: "Jones" },
            line_items: [
                {
                    id: 2019,
                    title: "Widget E",
                    quantity: 1,
                    price: "200.00",
                    variant_id: 3019,
                    variant_title: "Luxury",
                    vendor: "Widgets Co"
                },
                {
                    id: 2020,
                    title: "Widget F",
                    quantity: 2,
                    price: "100.00",
                    variant_id: 3020,
                    variant_title: "Basic",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1018,
            email: "henry@example.com",
            total_price: "250.00",
            financial_status: "Refunded",
            order_date: "2024-01-17",
            customer: { first_name: "Henry", last_name: "Klein" },
            line_items: [
                {
                    id: 2021,
                    title: "Widget G",
                    quantity: 1,
                    price: "250.00",
                    variant_id: 3021,
                    variant_title: "Advanced",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1019,
            email: "ivy@example.com",
            total_price: "500.00",
            financial_status: "Paid",
            order_date: "2024-01-18",
            customer: { first_name: "Ivy", last_name: "Lopez" },
            line_items: [
                {
                    id: 2022,
                    title: "Widget H",
                    quantity: 5,
                    price: "100.00",
                    variant_id: 3022,
                    variant_title: "Standard",
                    vendor: "Widgets Co"
                }
            ]
        },
        {
            id: 1020,
            email: "jack@example.com",
            total_price: "340.00",
            financial_status: "Pending",
            order_date: "2024-01-19",
            customer: { first_name: "Jack", last_name: "Moore" },
            line_items: [
                {
                    id: 2023,
                    title: "Widget I",
                    quantity: 2,
                    price: "170.00",
                    variant_id: 3023,
                    variant_title: "Deluxe",
                    vendor: "Widgets Co"
                }
            ]
        }
    ]
};
const inventoryAlertsResponse = {
    inventory: [
      {
        product_id: 3011,
        title: "Widget X",
        sku: "WX-001",
        stock: 10,
        reorder_level: 15,
        supplier_name: "Widgets Co",
        last_ordered_date: "2024-01-12",
        lead_time_days: 7,
        projected_runout_date: "2024-02-01",
        variant_title: "Standard",
        trend_indicator: "stable"
      },
      {
        product_id: 3012,
        title: "Widget Y",
        sku: "WY-002",
        stock: 5,
        reorder_level: 10,
        supplier_name: "Widgets Co",
        last_ordered_date: "2024-01-11",
        lead_time_days: 5,
        projected_runout_date: "2024-01-30",
        variant_title: "Deluxe",
        trend_indicator: "decreasing"
      },
      {
        product_id: 3013,
        title: "Widget Z",
        sku: "WZ-003",
        stock: 2,
        reorder_level: 8,
        supplier_name: "Widgets Co",
        last_ordered_date: "2024-01-10",
        lead_time_days: 10,
        projected_runout_date: "2024-01-25",
        variant_title: "Advanced",
        trend_indicator: "critical"
      },
      {
        product_id: 3017,
        title: "Widget C",
        sku: "WC-004",
        stock: 20,
        reorder_level: 10,
        supplier_name: "Eco Widgets Ltd",
        last_ordered_date: "2024-01-14",
        lead_time_days: 4,
        projected_runout_date: "2024-02-10",
        variant_title: "Eco-Friendly",
        trend_indicator: "stable"
      },
      {
        product_id: 3022,
        title: "Widget H",
        sku: "WH-005",
        stock: 25,
        reorder_level: 15,
        supplier_name: "High-Tech Widgets Inc",
        last_ordered_date: "2024-01-18",
        lead_time_days: 7,
        projected_runout_date: "2024-02-15",
        variant_title: "Standard",
        trend_indicator: "increasing"
      }
    ],
    user_preferences: {
      visible_columns: ["title", "sku", "stock", "reorder_level", "supplier_name", "last_ordered_date", "lead_time_days", "projected_runout_date", "trend_indicator"]
    }
  };
  

export const fetchTotalRevenue = async (req, res, next) => {
    try {
        // const url = `https://${SHOP_URL}/admin/api/2024-01/orders.json`;
        // const auth = {
        //     username: SHOPIFY_API_KEY,
        //     password: SHOPIFY_API_PASSWORD
        // };

        // const ordersResponse = await axios.get(url, { auth });
        // const orders = ordersResponse.data.orders;

        // let totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
        // return totalRevenue;
        const orders = ordersResponse.orders;
        let totalRevenue = 0;
        orders.forEach(order => {
            totalRevenue += parseFloat(order.total_price);
        });

        return totalRevenue;
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        throw error;
    }
};

export const fetchRecentOrders = async (page, limit) => {
    try {
        // const url = `https://${SHOP_URL}/admin/api/2024-01/orders.json?limit=10&order=created_at%20desc`
        // const auth = {
        //     username: SHOPIFY_API_KEY,
        //     password: SHOPIFY_API_PASSWORD
        // };

        // const ordersResponse = await axios.get(url, { auth });
        // return ordersResponse.data.orders;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const paginatedOrders = ordersResponse.orders.slice(startIndex, endIndex)
        return paginatedOrders;
    } catch(error){
        console.error('Error fetching recent orders:', error);
        throw error;
    }
};

export const fetchAllOrdersCount = async () => {
    try {
        return ordersResponse.orders.length;
    } catch (error){
        console.error('Error fetching total order count:', error);
        throw error;
    }
}