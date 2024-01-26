import React from 'react'
import { fetchInventoryAlerts } from '../Services/api'
import { useQuery } from 'react-query';
import { CircularProgress, Card, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const InventoryAlerts = () => {
  const { data, isLoading, isError, error } = useQuery('Inventory Alerts', fetchInventoryAlerts);
  if (isLoading){
      return <Box style={{ padding: '20px', margin: '10px' }}>< CircularProgress /></Box>;
  } 
  if (isError) return <Box style={{ padding: '20px', margin: '10px' }}>Error: {error.message}</Box>;
  return (
      <Card style={{ minHeight: '13.5rem' }}>
            <Table>
                <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Stock Level</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.length > 0 ? (
                    data.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.stockLevel}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No low stock items found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
            </Table>
        </Card>
  )
}

export default InventoryAlerts

