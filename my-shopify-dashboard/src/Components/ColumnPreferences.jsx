import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, Checkbox, MenuItem, ListItemText, OutlinedInput, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ColumnPreferences = ({ availableColumns, userPreferences, setUserPreferences }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      visible_columns: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  return (
    <div>
      <IconButton 
        variant="outlined" 
        color="info" 
        onClick={() => handleClickOpen()}
        size="small"
      >
        <SettingsIcon  />
      </IconButton>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose Columns</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="column-checkbox-label">Columns</InputLabel>
            <Select
              labelId="column-checkbox-label"
              id="column-checkbox"
              multiple
              value={userPreferences.visible_columns}
              onChange={handleChange}
              input={<OutlinedInput label="Column Preferences" />}
              renderValue={(selected) => selected.map(id => availableColumns.find(column => column.id === id).label).join(', ')}
              MenuProps={MenuProps}
            >
              {availableColumns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  <Checkbox 
                    checked={userPreferences.visible_columns.includes(column.id)}
                  />
                  <ListItemText primary={column.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ColumnPreferences;
