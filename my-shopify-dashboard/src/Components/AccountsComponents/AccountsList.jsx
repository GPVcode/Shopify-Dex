import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomerInsights } from '../../Services/api';
import {
    Box, Toolbar, Typography, TextField
} from '@mui/material';
import AccountsColumnPreferences from './AccountsColumnPreferences'
import InventoryIcon from '@mui/icons-material/Inventory';

// Initial Columns Here

// InitiaUserPreferences Here

const AccountsList = () => {

    return(
        <>
            <Box sx={{
            padding: '20px',
            margin: '10px',
            overflowY: 'auto',
            maxHeight: '500px',
            '&::-webkit-scrollbar': {
                width: '10px',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'darkgrey',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#3f9068',
            }
            }}>                
                <Box 
                    sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'column', med: 'column', lg: 'row' },
                    justifyContent: 'space-between', 
                    marginBottom: '2rem',
                    gap: 2,

                }}>
                    <Typography variant="h4">Accounts List</Typography>
                        <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'left', 
                        alignItems: 'center', 
                        flexWrap: 'wrap',
                        gap: 2,
                        }}>
                            <Box>
                                <TextField
                                    // onSearch={setSearchQuery}
                                    size="small" 
                                    // isLoading={isSearching}
                                    sx={{
                                    '.MuiOutlinedInput-root': {
                                        borderRadius: '50px', // Apply border-radius to the input field
                                    },
                                    }}
                                    placeholder='Search...'
                                />
                            </Box>

                        <AccountsColumnPreferences
                            // open={preferencesOpen}
                            // onClose={() => setPreferencesOpen(false)}
                            // availableColumns={columns}
                            // userPreferences={userPreferences}
                            // setUserPreferences={setUserPreferences}
                        />
                        {/* <InventoryIcon /> */}
                        </Box>
                </Box>

            </Box>
        </>
    )
};

export default AccountsList;