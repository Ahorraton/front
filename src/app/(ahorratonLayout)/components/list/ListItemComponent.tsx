import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListItemComponentProps {
    item: { id: string; name: string; quantity: number; price: number };
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    onDelete: (id: string) => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ item, onAdd, onRemove, onDelete }) => {
    return (
        <ListItem key={item.id}>
            <ListItemText
                primary={item.name}
                secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={() => onAdd(item.id)}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton edge="end" aria-label="remove" onClick={() => onRemove(item.id)}>
                    <RemoveCircleIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ListItemComponent;
