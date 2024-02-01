import React, { useState } from 'react'
import { fetchInventoryAlerts } from '../Services/api'
import { useQuery } from 'react-query';
import { CircularProgress, Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import ColumnPreferences from './ColumnPreferences';

const InventoryAlerts = () => {
  const { data, isLoading, isError, error } = useQuery('Inventory Alerts', fetchInventoryAlerts);
  const [userPreferences, setUserPreferences] = useState({ 
    visible_columns: [
      "title", 
      "sku", 
      "stock",
      "reorder_level", 
      "supplier_name", 
      "last_ordered_date", 
      "lead_time_days", 
      "projected_runout_date", 
      "trend_indicator"] 
  }); // Default columns

  if (isLoading){
      return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
  } 
  if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
  
  // Assuming inventory is part of the data
  const inventory = data || [];

  // Define the columns for preferences
  const availableColumns = [
    { id: 'title', label: 'Product Name' },
    { id: 'sku', label: 'SKU' },
    { id: 'stock', label: 'Stock' },
    { id: 'reorder_level', label: 'Reorder Level' },
    { id: 'supplier_name', label: 'Supplier' },
    { id: 'last_ordered_date', label: 'Last Ordered' },
    { id: 'lead_time_days', label: 'Lead Time (Days)' },
    { id: 'projected_runout_date', label: 'Projected Runout' },
    { id: 'trend_indicator', label: 'Trend' },
  ];

  return (
        <Box style={{ padding: '20px', margin: '10px' }}>
            <Typography variant="h5">Inventory Alerts</Typography>
            <ColumnPreferences 
              availableColumns={availableColumns}
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
            />
            <Table>
                <TableHead>
                  <TableRow>
                    {availableColumns.map(column => (
                      userPreferences.visible_columns.includes(column.id) && <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                {inventory.map((item, index) => (
                  <TableRow key={index}>
                    {availableColumns.map(column => (
                      userPreferences.visible_columns.includes(column.id) && <TableCell key={column.id}>{item[column.id]}</TableCell>
                    ))}
                  </TableRow>
                ))}
                </TableBody>
            </Table>
        </ Box>
  )
}

export default InventoryAlerts

