import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box } from '@mui/material';

// Custom debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useCallback(debounce((query) => {
    onSearch(query);
  }, 500), [onSearch]);

  // Effect that calls the debouncedSearch function when inputValue changes
  useEffect(() => {
    if (inputValue !== '') {
      debouncedSearch(inputValue);
    }
  }, [inputValue, debouncedSearch]);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter product name..."
      />
    </Box>
  );
};

export default SearchBar;
