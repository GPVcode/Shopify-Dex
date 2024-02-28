import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  OutlinedInput,
  IconButton
} from '@mui/material';
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

const AccountsColumnPreferences = ({ columns, setColumns }) => {
  const [open, setOpen] = useState(false);

  // Extracts the ids of visible columns from the columns array
  const visibleColumnIds = columns.filter(column => column.visible).map(column => column.id);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Updates the visibility based on the selected values
    const updatedColumns = columns.map(column => ({
      ...column,
      visible: value.includes(column.id),
    }));

    setColumns(updatedColumns);
  };

  return (
    <>
      <IconButton 
        aria-label="column settings"
        onClick={handleClickOpen}
        size="small"
      >
        <SettingsIcon />
      </IconButton>
      
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Choose Columns</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="column-checkbox-label">Columns</InputLabel>
            <Select
              labelId="column-checkbox-label"
              id="column-checkbox"
              multiple
              value={visibleColumnIds}
              onChange={handleChange}
              input={<OutlinedInput label="Columns" />}
              renderValue={(selected) => selected.map(id => columns.find(column => column.id === id)?.label || '').join(', ')}
              MenuProps={MenuProps}
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  <Checkbox checked={visibleColumnIds.includes(column.id)} />
                  <ListItemText primary={column.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen}>Cancel</Button>
          <Button onClick={handleClickOpen}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AccountsColumnPreferences.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  })).isRequired,
  setColumns: PropTypes.func.isRequired,
};

export default AccountsColumnPreferences;
