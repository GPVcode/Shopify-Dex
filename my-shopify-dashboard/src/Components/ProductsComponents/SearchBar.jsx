import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';

// Custom debounce function
const debounce = (func, wait) => {
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

const SearchBar = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  
  // Use useCallback to memoize the debounced version of onSearch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 500), 
    [onSearch] // Recreate function only if onSearch changes
  );

  useEffect(() => {
    // Adjusted to call onSearch with empty string to reset search results
    debouncedSearch(inputValue);
    // Cleanup function to cancel the debounce if the component unmounts
    return () => {
      // Useful for cancelling the debounce if you quickly navigate away from the page or if inputValue changes again before the debounce timer runs out.
      debouncedSearch.cancel && debouncedSearch.cancel(); 
    };
  }, [inputValue, debouncedSearch]);

  return (
    <Box >
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter product name..."
        InputProps={{
          endAdornment: isLoading ? <CircularProgress color="inherit" size={20} /> : null,
        }}
        inputProps={{
          'aria-label': 'Search products',
        }}
      />
      {isLoading && <CircularProgress color="inherit" size={20} sx={{ position: 'absolute', top: '50%', right: '0%', marginTop: '-10px', marginRight: '10px' }} />
}
    </Box>
  );
};

export default SearchBar;
