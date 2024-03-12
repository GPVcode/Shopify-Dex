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

        return {
            source,
            orderId: order.id,
            date: date.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
            totalRevenue: parseFloat(order.total_price),
            financialStatus: order.financial_status,
            createdAt: order.created_at,
            totalRevenue: parseFloat(order.total_price),
            currency: order.currency,
            financialStatus: order.financial_status,
            country: billingAddress.country_code || 'Unknown',
            customerTags: customer.tags,
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
    const tableId = 'PaidOrders';

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
    const tableId = 'Staging_PaidOrders';

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
export const mergeStagingToPaidOrders = async () => {
    const query = `
    MERGE INTO \`paid_orders.PaidOrders\` AS target
    USING \`paid_orders.Staging_PaidOrders\` AS source
    ON target.orderId = source.orderId
    WHEN MATCHED THEN
        UPDATE SET source.*
    WHEN NOT MATCHED THEN
        INSERT ROW
    `;

    try {
        await bigQueryClient.query(query);
        console.log("Merge operation completed successfully.");
    } catch (error) {
        console.error("Error during merge operation:", error);
    }
};

