import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialCards = [
  // Initial example cards
  { id: 1, text: 'Example Task 1' },
  { id: 2, text: 'Example Task 2' },
];

const TaskBoard = () => {
  const [cards, setCards] = useState(initialCards);
  const [open, setOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  const handleClickOpen = (card = null) => {
    setEditingCard(card);
    setEditText(card ? card.text : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrEditCard = () => {
    if (editingCard) {
      setCards(cards.map(card => card.id === editingCard.id ? { ...card, text: editText } : card));
    } else {
      const newCard = { id: Date.now(), text: editText };
      setCards([...cards, newCard]);
    }
    setOpen(false);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => handleClickOpen()}>Add Card</Button>
      <List>
        {cards.map((card) => (
          <ListItem
            key={card.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(card)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCard(card.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={card.text} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCard ? 'Edit Card' : 'New Card'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Card Text"
            type="text"
            fullWidth
            variant="standard"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrEditCard}>{editingCard ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskBoard;
