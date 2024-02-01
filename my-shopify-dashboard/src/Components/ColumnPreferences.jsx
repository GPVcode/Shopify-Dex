import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const ColumnPreferences = ({ availableColumns, userPreferences, setUserPreferences }) => {
  
    const handleChange = (event) => {
        const { name, checked } = event.target;
    
        setUserPreferences((prevPreferences) => {
            // Get the current list of visible columns
            const currentColumns = prevPreferences.visible_columns;
    
            let updatedColumns;
            if (checked) {
                // If the checkbox is checked, add the column name to the list
                updatedColumns = [...currentColumns, name];
            } else {
                // If the checkbox is unchecked, remove the column name from the list
                updatedColumns = currentColumns.filter(columnName => columnName !== name);
            }
    
            // Return the updated preferences
            return {
                ...prevPreferences,
                visible_columns: updatedColumns
            };
        });
    };
    

  return (
    <FormGroup>
      {availableColumns.map(column => (
        <FormControlLabel
          key={column.id}
          control={<Checkbox checked={userPreferences.visible_columns.includes(column.id)} onChange={handleChange} name={column.id} />}
          label={column.label}
        />
      ))}
    </FormGroup>
  );
};

export default ColumnPreferences;
