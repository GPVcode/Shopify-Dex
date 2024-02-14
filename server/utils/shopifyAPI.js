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
            financial_status: "Paid",
            order_date: "2024-01-20",
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
            order_date: "2024-02-05",
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
            order_date: "2024-02-15",
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
            financial_status: "Paid",
            order_date: "2024-03-10",
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
            order_date: "2024-03-20",
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
            order_date: "2024-02-16",
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
            financial_status: "Pending",
            order_date: "2024-02-18",
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
            financial_status: "Paid",
            order_date: "2024-03-19",
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
const inventoryResponse = {
    "inventory": [
      {
        "product_id": 3011,
        "title": "Widget X",
        "sku": "WX-001",
        "stock": 10,
        "reorder_level": 15,
        "supplier_name": "Widgets Co",
        "last_ordered_date": "2024-01-12",
        "lead_time_days": 7,
        "projected_runout_date": "2024-02-01",
        "variant_title": "Standard",
        "sales_velocity": "2",
        "profit_margin": "30%"
      },
      {
        "product_id": 3012,
        "title": "Widget Y",
        "sku": "WY-002",
        "stock": 5,
        "reorder_level": 10,
        "supplier_name": "Widgets Co",
        "last_ordered_date": "2024-01-11",
        "lead_time_days": 5,
        "projected_runout_date": "2024-01-30",
        "variant_title": "Deluxe",
        "sales_velocity": "1.5",
        "profit_margin": "25%"
      },
      {
        "product_id": 3013,
        "title": "Widget Z",
        "sku": "WZ-003",
        "stock": 2,
        "reorder_level": 8,
        "supplier_name": "Widgets Co",
        "last_ordered_date": "2024-01-10",
        "lead_time_days": 10,
        "projected_runout_date": "2024-01-25",
        "variant_title": "Advanced",
        "sales_velocity": "0.5",
        "profit_margin": "40%"
      },
      {
        "product_id": 3017,
        "title": "Widget C",
        "sku": "WC-004",
        "stock": 20,
        "reorder_level": 10,
        "supplier_name": "Eco Widgets Ltd",
        "last_ordered_date": "2024-01-14",
        "lead_time_days": 4,
        "projected_runout_date": "2024-02-10",
        "variant_title": "Eco-Friendly",
        "sales_velocity": "3",
        "profit_margin": "20%"
      },
      {
        "product_id": 3022,
        "title": "Widget H",
        "sku": "WH-005",
        "stock": 25,
        "reorder_level": 15,
        "supplier_name": "High-Tech Widgets Inc",
        "last_ordered_date": "2024-01-18",
        "lead_time_days": 7,
        "projected_runout_date": "2024-02-15",
        "variant_title": "Standard",
        "sales_velocity": "2.5",
        "profit_margin": "35%"
      }
    ],
    "user_preferences": {
      "visible_columns": [
        "title",
        "sku",
        "stock",
        "reorder_level",
        "supplier_name",
        "last_ordered_date",
        "lead_time_days",
        "projected_runout_date",
        "sales_velocity",
        "profit_margin"
      ]
    }
};
const trafficDataResponse = {
    "traffic_sources": [
      {
        "source": "Web",
        "visits": 1200
      },
      {
        "source": "Mobile",
        "visits": 800
      },
      {
        "source": "Social",
        "visits": 600
      },
      {
        "source": "Email",
        "visits": 400
      }
    ]
};
const customersResponse = {
  "customers": [
    {
      "id": 1001,
      "email": "john.doe@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "created_at": "2024-01-01T12:00:00Z",
      "orders_count": 2,
      "total_spent": "200.00",
      "city": "Anytown",
      "province": "California",
      "country": "United States",
      "customer_status": "Returning"
    },
    {
      "id": 1002,
      "email": "jane.doe@example.com",
      "first_name": "Jane",
      "last_name": "Doe",
      "created_at": "2024-03-15T12:00:00Z",
      "orders_count": 1,
      "total_spent": "100.00",
      "city": "Anytown",
      "province": "California",
      "country": "United States",
      "customer_status": "New"
    },
    {
      "id": 1003,
      "email": "alice.johnson@example.com",
      "first_name": "Alice",
      "last_name": "Johnson",
      "created_at": "2024-02-20T12:00:00Z",
      "orders_count": 3,
      "total_spent": "450.00",
      "city": "Springfield",
      "province": "Illinois",
      "country": "United States",
      "customer_status": "Returning"
    },
    {
      "id": 1004,
      "email": "bob.smith@example.com",
      "first_name": "Bob",
      "last_name": "Smith",
      "created_at": "2024-02-11T12:00:00Z",
      "orders_count": 4,
      "total_spent": "600.00",
      "city": "Centerville",
      "province": "Iowa",
      "country": "United States",
      "customer_status": "High-Value"
    },
    {
      "id": 1005,
      "email": "carol.williams@example.com",
      "first_name": "Carol",
      "last_name": "Williams",
      "created_at": "2023-12-25T12:00:00Z",
      "orders_count": 1,
      "total_spent": "150.00",
      "city": "Smalltown",
      "province": "Texas",
      "country": "United States",
      "customer_status": "New"
    },
    {
      "id": 1006,
      "email": "david.brown@example.com",
      "first_name": "David",
      "last_name": "Brown",
      "created_at": "2024-01-10T12:00:00Z",
      "orders_count": 5,
      "total_spent": "1200.00",
      "city": "Laketown",
      "province": "Minnesota",
      "country": "United States",
      "customer_status": "High-Value"
    },
    {
      "id": 1007,
      "email": "eve.davis@example.com",
      "first_name": "Eve",
      "last_name": "Davis",
      "created_at": "2024-03-01T12:00:00Z",
      "orders_count": 2,
      "total_spent": "300.00",
      "city": "Hill Valley",
      "province": "California",
      "country": "United States",
      "customer_status": "Returning"
    },
    {
      "id": 1008,
      "email": "frank.miller@example.com",
      "first_name": "Frank",
      "last_name": "Miller",
      "created_at": "2024-01-20T12:00:00Z",
      "orders_count": 3,
      "total_spent": "750.00",
      "city": "Metropolis",
      "province": "New York",
      "country": "United States",
      "customer_status": "High-Value"
    },
    {
      "id": 1009,
      "email": "grace.wilson@example.com",
      "first_name": "Grace",
      "last_name": "Wilson",
      "created_at": "2024-03-10T12:00:00Z",
      "orders_count": 1,
      "total_spent": "90.00",
      "city": "Gotham",
      "province": "New Jersey",
      "country": "United States",
      "customer_status": "New"
    },
    {
      "id": 1010,
      "email": "henry.king@example.com",
      "first_name": "Henry",
      "last_name": "King",
      "created_at": "2024-01-05T12:00:00Z",
      "orders_count": 1,
      "total_spent": "60.00",
      "city": "Riverdale",
      "province": "Oregon",
      "country": "United States",
      "customer_status": "New"
    },
    {
      "id": 1011,
      "email": "isabel.young@example.com",
      "first_name": "Isabel",
      "last_name": "Young",
      "created_at": "2024-02-28T12:00:00Z",
      "orders_count": 2,
      "total_spent": "320.00",
      "city": "Star City",
      "province": "Washington",
      "country": "United States",
      "customer_status": "Returning"
    },
    {
      "id": 1012,
      "email": "jacob.moore@example.com",
      "first_name": "Jacob",
      "last_name": "Moore",
      "created_at": "2023-11-15T12:00:00Z",
      "orders_count": 3,
      "total_spent": "470.00",
      "city": "Central City",
      "province": "Missouri",
      "country": "United States",
      "customer_status": "Returning"
    },
    {
      "id": 1013,
      "email": "karen.hall@example.com",
      "first_name": "Karen",
      "last_name": "Hall",
      "created_at": "2024-03-20T12:00:00Z",
      "orders_count": 4,
      "total_spent": "880.00",
      "city": "National City",
      "province": "Kansas",
      "country": "United States",
      "customer_status": "High-Value"
    },
    {
      "id": 1014,
      "email": "louis.carter@example.com",
      "first_name": "Louis",
      "last_name": "Carter",
      "created_at": "2024-01-25T12:00:00Z",
      "orders_count": 1,
      "total_spent": "110.00",
      "city": "Emerald City",
      "province": "Nevada",
      "country": "United States",
      "customer_status": "New"
    },
    {
      "id": 1015,
      "email": "megan.brown@example.com",
      "first_name": "Megan",
      "last_name": "Brown",
      "created_at": "2024-03-05T12:00:00Z",
      "orders_count": 2,
      "total_spent": "210.00",
      "city": "Blüdhaven",
      "province": "New Jersey",
      "country": "United States",
      "customer_status": "Returning"
    }
  ]
};

const userEngagementMetricsData = {
  data: [
      {
          month: "January",
          sessionDuration: 5.2,
          pagesPerSession: 3.5,
          bounceRate: 40,
          activeUsers: 1200
      },
      {
          month: "February",
          sessionDuration: 6.1,
          pagesPerSession: 4.0,
          bounceRate: 35,
          activeUsers: 1250
      },
      {
          month: "March",
          sessionDuration: 5.8,
          pagesPerSession: 3.8,
          bounceRate: 38,
          activeUsers: 1300
      },
      {
          month: "April",
          sessionDuration: 6.5,
          pagesPerSession: 4.2,
          bounceRate: 32,
          activeUsers: 1350
      }
  ],
  status: "success",
  message: "User engagement metrics fetched successfully."
};


export const fetchTotalRevenue = async (req, res, next) => {
  try {
      const orders = ordersResponse.orders;

      const monthlyRevenue = {};
      const dailyRevenue = {};

      orders.forEach(order => {
          if (order.financial_status === "Paid") {
              const date = new Date(order.order_date);
              const month = date.getMonth() + 1; // JavaScript months are 0-based.
              const year = date.getFullYear();
              const day = date.getDate();
              const monthYearKey = `${year}-${month.toString().padStart(2, '0')}`;
              const dailyKey = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

              // Accumulate monthly revenue
              monthlyRevenue[monthYearKey] = (monthlyRevenue[monthYearKey] || 0) + parseFloat(order.total_price);

              // Accumulate daily revenue
              dailyRevenue[dailyKey] = (dailyRevenue[dailyKey] || 0) + parseFloat(order.total_price);
          }
      });

      const totalRevenue = Object.values(monthlyRevenue).reduce((sum, revenue) => sum + revenue, 0);
      // Prepare and return the response with yearly (total), monthly, and daily revenue
     return {
          totalRevenue,
          monthlyRevenue,
          dailyRevenue
      };

  } catch (error) {
      console.error('Error fetching revenue data:', error);
      res.status(500).json({ message: 'Error fetching total revenue.' });
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
        const endIndex = startIndex + limit;
        
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
};

export const fetchInventoryAlerts = async (page = 1, limit = 5) => {

    try {
        // Placeholder for Shopify API call
        // const url = `https://${process.env.SHOP_URL}/admin/api/2024-01/products.json`;
        // const auth = {
        //     username: process.env.SHOPIFY_API_KEY,
        //     password: process.env.SHOPIFY_API_PASSWORD
        // };
        // const response = await axios.get(url, { auth });
        // const products = response.data.products;

        // Simulate filtering for low-stock items based on the reorder level
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const lowStockItems = inventoryResponse.inventory
            .filter(item => item.stock <= item.reorder_level)
            .slice(startIndex, endIndex);

        const total = inventoryResponse.inventory.filter(item => item.stock <= item.reorder_level).length;

        return {
            items: lowStockItems,
            total,
            page,
            limit,
        };
    } catch (error) {
        console.error('Error fetching inventory alerts:', error);
        throw error;// Simulate total count for headers (e.g., for 'X-Total-Count' response header)        
    }
};

export const fetchProductsOverview = async ({ page = 1, limit = 5 }) => {
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const detailedProducts = inventoryResponse.inventory.slice(startIndex, endIndex).map(item => ({
            product_id: item.product_id,
            title: item.title,
            sku: item.sku,
            stock: item.stock,
            reorder_level: item.reorder_level,
            supplier_name: item.supplier_name,
            last_ordered_date: item.last_ordered_date,
            lead_time_days: item.lead_time_days,
            projected_runout_date: item.projected_runout_date,
            sales_velocity: item.sales_velocity,
            profit_margin: item.profit_margin,
        }));

        const total = inventoryResponse.inventory.length;

        return {
            detailedProducts,
            total,
            page,
            limit,
        };
    } catch (error) {
        console.error('Error fetching products overview:', error);
        throw error;
    }
};

export const fetchTrafficSources = async () => {
    try {
      const response = trafficDataResponse;
      return response;
    } catch (error) {
      console.error('There was a problem fetching the traffic sources:', error);
      throw error;
    }
};

export const fetchCustomerInsights = async ({ page = 1, limit = 5 }) => {
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const totalCustomers = customersResponse.customers.length;
        const paginatedCustomers = customersResponse.customers.slice(startIndex, endIndex);

        return {
            total: totalCustomers,
            customers: paginatedCustomers,
            page,
            limit,
            totalPages: Math.ceil(totalCustomers / limit)
        };
    } catch(error) {
      console.error('There was a problem fetching customer insights:', error);
      throw error;
    }
};

export const fetchProductPerformance = async () => {
  try {
      const productSales = {};

      // Aggregate sales volume and revenue from orders
      ordersResponse.orders.forEach(order => {
          order.line_items.forEach(item => {
            // if its the first time seeing the product, set up tracker for salesVolumen, revenue, returns and returned revenue keys
              if (!productSales[item.variant_id]) {
                  productSales[item.variant_id] = { salesVolume: 0, revenue: 0, returns: 0, returnedRevenue: 0 };
              }
              //  add product sold to total count and calculate revenue
              productSales[item.variant_id].salesVolume += item.quantity;
              productSales[item.variant_id].revenue += item.quantity * parseFloat(item.price);
              // handle refunds quantitu and returne revenue
              if (order.financial_status === "Refunded") {
                  productSales[item.variant_id].returns += item.quantity;
                  productSales[item.variant_id].returnedRevenue += item.quantity * parseFloat(item.price);
              }
          });
      });

      // Merge with inventory data for profit margins and calculate return rates
      const productsPerformance = inventoryResponse.inventory.map(product => {
          const salesInfo = productSales[product.product_id] || {};
          const returnRate = salesInfo.returns ? (salesInfo.returns / salesInfo.salesVolume) * 100 : 0;
          const profitMargin = ((salesInfo.revenue - salesInfo.returnedRevenue) * parseFloat(product.profit_margin) / 100).toFixed(2);
          return {
              productId: product.product_id,
              title: product.title,
              salesVolume: salesInfo.salesVolume || 0,
              revenue: (salesInfo.revenue - salesInfo.returnedRevenue).toFixed(2),
              profitMargin: `${profitMargin}%`,
              returnRate: `${returnRate.toFixed(2)}%`
          };
      });

      return productsPerformance;
  } catch (error) {
      console.error('Error fetching product performance:', error);
      throw error;
  }
};

export const fetchUserEngagementMetrics = async () => {
  try {
      // Simulate an asynchronous operation, e.g., database call or external API call
      // For demonstration, we directly return the static data
      return userEngagementMetricsData;
  } catch (error) {
      console.error('Error fetching user engagement metrics:', error);
      res.status(500).json({ message: 'Error fetching user engagement metrics.' });
  }
};
