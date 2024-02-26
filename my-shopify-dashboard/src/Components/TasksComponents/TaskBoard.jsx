import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Grid, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialColumns = {
  todo: { name: 'To Do', cards: [{ id: '1', header: 'Task 1', body: 'Details of Task 1' }, { id: '2', header: 'Task 2', body: 'Details of Task 2' }] },
  inProgress: { name: 'In Progress', cards: [{ id: '3', header: 'Task 3', body: 'Details of Task 3' }] },
  done: { name: 'Done', cards: [{ id: '4', header: 'Task 4', body: 'Details of Task 4' }] },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = useState(false);
  const [editHeader, setEditHeader] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  const handleClickOpen = (columnKey, card = null) => {
    setActiveColumn(columnKey);
    setEditingCard(card);
    setEditHeader(card ? card.header : '');
    setEditBody(card ? card.body : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrEditCard = () => {
    if (editingCard) {
      const updatedColumns = { ...columns };
      updatedColumns[activeColumn].cards = updatedColumns[activeColumn].cards.map(card =>
        card.id === editingCard.id ? { ...card, header: editHeader, body: editBody } : card
      );
      setColumns(updatedColumns);
    } else {
      const newCard = { id: Date.now().toString(), header: editHeader, body: editBody };
      const updatedColumns = { ...columns };
      updatedColumns[activeColumn].cards.push(newCard);
      setColumns(updatedColumns);
    }
    setOpen(false);
  };

  const handleDeleteCard = (columnKey, id) => {
    const updatedColumns = { ...columns };
    updatedColumns[columnKey].cards = updatedColumns[columnKey].cards.filter(card => card.id !== id);
    setColumns(updatedColumns);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cards);
      const [removed] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, removed);

      const newColumn = {
        ...start,
        cards: newCardIds,
      };

      const newState = {
        ...columns,
        [source.droppableId]: newColumn,
      };

      setColumns(newState);
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(start.cards);
    const [removed] = startCardIds.splice(source.index, 1);
    const finishCardIds = Array.from(finish.cards);
    finishCardIds.splice(destination.index, 0, removed);

    const newState = {
      ...columns,
      [source.droppableId]: {
        ...start,
        cards: startCardIds,
      },
      [destination.droppableId]: {
        ...finish,
        cards: finishCardIds,
      },
    };

    setColumns(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          {Object.keys(columns).map((columnKey, index) => (
            <Grid item xs={12} sm={4} key={columnKey}>
              <Typography variant="h6" component="div">
                {columns[columnKey].name}
              </Typography>
              <Button variant="outlined" onClick={() => handleClickOpen(columnKey)}>Add Card</Button>
              <Droppable droppableId={columnKey}>
                {(provided) => (
                  <List {...provided.droppableProps} ref={provided.innerRef}>
                    {columns[columnKey].cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            secondaryAction={
                              <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(columnKey, card)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCard(columnKey, card.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            }
                          >
                            <ListItemText primary={card.header} />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingCard ? 'Edit Card' : 'Add Card'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="header"
            label="Card Header"
            type="text"
            fullWidth
            variant="standard"
            value={editHeader}
            onChange={(e) => setEditHeader(e.target.value)}
          />
          <TextField
            margin="dense"
            id="body"
            label="Card Body"
            type="text"
            fullWidth
            variant="standard"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddOrEditCard}>{editingCard ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </DragDropContext>
  );
};

export default KanbanBoard;
