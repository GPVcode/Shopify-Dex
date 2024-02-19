import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const FilterOptions = ({ categories, onCategoryChange }) => {
  return (
    <Box sx={{ minWidth: 120, ml: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterOptions;
