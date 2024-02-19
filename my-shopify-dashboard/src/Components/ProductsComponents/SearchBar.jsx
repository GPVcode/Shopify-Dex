import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {

    console.log("hlkdsfjasljf: ", onSearch)
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Enter product name..."
      />
    </Box>
  );
};

export default SearchBar;
