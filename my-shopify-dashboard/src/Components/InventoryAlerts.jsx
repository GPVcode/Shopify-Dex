import React from 'react'
import { fetchInventoryAlerts } from '../Services/api'
import { useQuery } from 'react-query';
import { CircularProgress, Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const InventoryAlerts = () => {
  const { data, isLoading, isError, error } = useQuery('Inventory Alerts', fetchInventoryAlerts);
  if (isLoading){
      return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
  } 
  if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
  
  // default inventory and user preference to false in event of null or undefined
  const inventory = data?.inventory || [];
  const user_preferences = data?.user_preferences || { visible_columns: [] }; 
  return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Inventory Alerts</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                      {/* Dynamically render table headers based on user preferences */}
                      {user_preferences.visible_columns.includes("title") && <TableCell>Product Name</TableCell>}
                      {user_preferences.visible_columns.includes("sku") && <TableCell>SKU</TableCell>}
                      {user_preferences.visible_columns.includes("stock") && <TableCell>Stock</TableCell>}
                      {/* Add additional columns based on the new data structure and user preferences */}
                      {user_preferences.visible_columns.includes("reorder_level") && <TableCell>Reorder Level</TableCell>}
                      {user_preferences.visible_columns.includes("supplier_name") && <TableCell>Supplier</TableCell>}
                      {user_preferences.visible_columns.includes("last_ordered_date") && <TableCell>Last Ordered</TableCell>}
                      {user_preferences.visible_columns.includes("lead_time_days") && <TableCell>Lead Time (Days)</TableCell>}
                      {user_preferences.visible_columns.includes("projected_runout_date") && <TableCell>Projected Runout</TableCell>}
                      {user_preferences.visible_columns.includes("trend_indicator") && <TableCell>Trend</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                {inventory && inventory.length > 0 ? (
                  inventory.map((item, index) => (
                    <TableRow key={index}>
                      {user_preferences.visible_columns.includes("title") && <TableCell>{item.title}</TableCell>}
                      {user_preferences.visible_columns.includes("sku") && <TableCell>{item.sku}</TableCell>}
                      {user_preferences.visible_columns.includes("stock") && <TableCell>{item.stock}</TableCell>}
                      {/* Render additional cells based on the new data structure and user preferences */}
                      {user_preferences.visible_columns.includes("reorder_level") && <TableCell>{item.reorder_level}</TableCell>}
                      {user_preferences.visible_columns.includes("supplier_name") && <TableCell>{item.supplier_name}</TableCell>}
                      {user_preferences.visible_columns.includes("last_ordered_date") && <TableCell>{item.last_ordered_date}</TableCell>}
                      {user_preferences.visible_columns.includes("lead_time_days") && <TableCell>{item.lead_time_days}</TableCell>}
                      {user_preferences.visible_columns.includes("projected_runout_date") && <TableCell>{item.projected_runout_date}</TableCell>}
                      {user_preferences.visible_columns.includes("trend_indicator") && <TableCell>{item.trend_indicator}</TableCell>}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={user_preferences.visible_columns.length}>No low stock items found.</TableCell>
                  </TableRow>
                  )}
                </TableBody>
            </Table>
        </ Box>
  )
}

export default InventoryAlerts

