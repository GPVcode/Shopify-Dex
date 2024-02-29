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

// These props might be slightly different based on how your accounts data is structured
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

const AccountsColumnPreferences = ({ availableColumns, userPreferences, setUserPreferences }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
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
              value={userPreferences?.visible_columns || []}
              onChange={handleChange}
              input={<OutlinedInput label="Columns" />}
              renderValue={(selected) => selected.map(id => availableColumns.find(column => column.id === id)?.label || '').join(', ')}
              MenuProps={MenuProps}
            >
              {availableColumns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  <Checkbox checked={userPreferences?.visible_columns?.includes(column.id) || false} />
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

AccountsColumnPreferences.defaultProps = {
  userPreferences: { visible_columns: [] },
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
