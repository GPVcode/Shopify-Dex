// /server/database/bigQueryHelper.js
import bigQueryClient from '../utils/bigqueryClient.js'
/**
 * Cleans and prepares order data for BigQuery insertion.
 * @param {Array} orders - The orders array fetched from Shopify.
 * @returns {Array} The cleaned and structured data for BigQuery.
 */
export const prepareOrdersForBigQuery = (orders) => {
    
    return orders.map(order => {
        const date = new Date(order.created_at);
        const billingAddress = order.billing_address || {};
        const customer = order.customer || {};
        const source = 'Shopify';
        const customerTagsArray = customer.tags ? customer.tags.split(',').map(tag => tag.trim()) : []; // Convert customerTags string into an array

        return {
            source,
            orderId: order.id,
            date: date.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
            totalRevenue: parseFloat(order.total_price),
            financialStatus: order.financial_status,
            country: billingAddress.country_code || 'Unknown',
            customerTags: customerTagsArray,
            customerEmailVerified: customer.verified_email || false,
            acceptsMarketing: customer.accepts_marketing || false,
            orderNumber: order.order_number,
            totalWeight: order.total_weight || 0,
            subtotalPrice: parseFloat(order.subtotal_price),
            totalDiscounts: parseFloat(order.total_discounts),
            numberOfLineItems: order.line_items.length,
            shippingCountry: order.shipping_address ? order.shipping_address.country_code : 'Unknown',
        };
    });
};

/**
 * Inserts cleaned orders data into a BigQuery table.
 * @param {Array} orders - The cleaned and structured orders data.
 */
export const insertPaidOrdersIntoBigQuery = async (orders) => {
    const datasetId = 'paid_orders';
    const tableId = 'PaidOrders_copy';

    try {
        // Specify the dataset and table where data will be inserted
        await bigQueryClient
            .dataset(datasetId)
            .table(tableId)
            .insert(orders);
        console.log(`Inserted ${orders.length} rows into PaidOrders BigQuery`);
    } catch (error) {
        if (error && error.name === 'PartialFailureError') {
            // When some rows are inserted successfully, but others fail (e.g., due to schema mismatches)
            console.error('Some rows failed to insert:', JSON.stringify(error.errors, null, 2));

        } else {
            // Handle other types of errors
            console.error('Error inserting data into BigQuery:', error);
        }
    }
};

export const insertOrdersIntoStagingTable = async (orders) => {
    const datasetId = 'paid_orders';
    const tableId = 'StagingPaidOrders_copy';

    try {
        await bigQueryClient.dataset(datasetId).table(tableId).insert(orders);
        console.log(`Inserted ${orders.length} rows into the staging table`);
    } catch (error) {
        console.error('Error inserting data into the staging table:', error);
    }
};

/**
 * Merges data from the staging table to the final PaidOrders table.
 */

export const mergeStagingToFinalTable = async () => {
    const datasetId = 'paid_orders';
    // Ensure the mergeQuery is designed to match rows uniquely and update all necessary fields.
    const mergeQuery = `
        MERGE ${datasetId}.PaidOrders_copy AS final
        USING ${datasetId}.StagingPaidOrders_copy AS staging
        ON final.orderId = staging.orderId
        WHEN MATCHED THEN
            UPDATE SET 
                final.totalRevenue = staging.totalRevenue, 
                final.customerEmailVerified = staging.customerEmailVerified,
                final.financialStatus = staging.financialStatus,
                final.country = staging.country,
                final.customerTags = staging.customerTags,
                final.acceptsMarketing = staging.acceptsMarketing,
                final.orderNumber = staging.orderNumber,
                final.totalWeight = staging.totalWeight,
                final.subtotalPrice = staging.subtotalPrice,
                final.totalDiscounts = staging.totalDiscounts,
                final.numberOfLineItems = staging.numberOfLineItems,
                final.shippingCountry = staging.shippingCountry
        WHEN NOT MATCHED THEN
            INSERT (orderId, date, totalRevenue, financialStatus, country, customerTags, customerEmailVerified, acceptsMarketing, orderNumber, totalWeight, subtotalPrice, totalDiscounts, numberOfLineItems, shippingCountry)
            VALUES (staging.orderId, staging.date, staging.totalRevenue, staging.financialStatus, staging.country, staging.customerTags, staging.customerEmailVerified, staging.acceptsMarketing, staging.orderNumber, staging.totalWeight, staging.subtotalPrice, staging.totalDiscounts, staging.numberOfLineItems, staging.shippingCountry);    
    `;
// interesting
    try {
        await bigQueryClient.query(mergeQuery);
        console.log('Merge operation completed successfully');
    } catch (error) {
        console.error('Error during merge operation:', error);
    }
};




