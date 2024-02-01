import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const ColumnPreferences = ({ availableColumns, userPreferences, setUserPreferences }) => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      visible_columns: checked
        ? [...prevPreferences.visible_columns, name]
        : prevPreferences.visible_columns.filter(columnName => columnName !== name),
    }));
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
