import React, { useState } from 'react';
import { List, ListItemText, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Simplified initial structure for clarity
const initialColumns = {
  'column-1': { id: 'column-1', name: 'To Do', items: [{ id: '1', text: 'Example Task 1' }, { id: '2', text: 'Example Task 2' }] },
  'column-2': { id: 'column-2', name: 'In Progress', items: [] },
  'column-3': { id: 'column-3', name: 'Done', items: [] },
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [open, setOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [editingCard, setEditingCard] = useState(null);
  const [editingColumn, setEditingColumn] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
    const newStartItems = Array.from(startColumn.items);
    const [removedItem] = newStartItems.splice(source.index, 1);

    if (startColumn === finishColumn) {
      newStartItems.splice(destination.index, 0, removedItem);
      const newColumn = { ...startColumn, items: newStartItems };
      setColumns(prev => ({ ...prev, [newColumn.id]: newColumn }));
    } else {
      const newFinishItems = Array.from(finishColumn.items);
      newFinishItems.splice(destination.index, 0, removedItem);
      setColumns(prev => ({
        ...prev,
        [startColumn.id]: { ...startColumn, items: newStartItems },
        [finishColumn.id]: { ...finishColumn, items: newFinishItems },
      }));
    }
  };

  const handleCardOperation = () => {
    if (editingCard) {
      // Edit operation
      const newColumns = { ...columns };
      const items = newColumns[editingColumn].items.map(item =>
        item.id === editingCard.id ? { ...item, text: editText } : item
      );
      newColumns[editingColumn].items = items;
      setColumns(newColumns);
    } else {
      // Add operation, for simplicity adding to the first column
      const newCard = { id: `id-${Date.now()}`, text: editText };
      const firstColumnKey = Object.keys(columns)[0];
      const updatedColumn = { ...columns[firstColumnKey], items: [...columns[firstColumnKey].items, newCard] };
      setColumns({ ...columns, [firstColumnKey]: updatedColumn });
    }
    handleClose();
  };

  const handleClickOpen = (card = null, columnId = null) => {
    setEditingCard(card);
    setEditingColumn(columnId);
    setEditText(card ? card.text : '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCard(null);
    setEditingColumn(null);
    setEditText('');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ minWidth: 250, minHeight: 500, backgroundColor: 'lightgrey', padding: '10px' }}
              >
                <Typography sx={{ textAlign: 'center', marginBottom: '20px' }}>{column.name}</Typography>
                <List>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ marginBottom: '8px', padding: '10px', backgroundColor: 'white' }}
                        >
                          <ListItemText primary={item.text} />
                          <IconButton onClick={() => handleClickOpen(item, columnId)}><EditIcon /></IconButton>
                          {/* Delete button functionality would go here */}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
                <Button onClick={() => handleClickOpen(null, columnId)}>Add Card</Button>
              </Box>
            )}
          </Droppable>
        ))}
      </Box>
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
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCardOperation}>{editingCard ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </DragDropContext>
  );
};

export default TaskBoard;
