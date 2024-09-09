import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItem as ListItemType } from '../../../../redux/store/listSlice';


interface ListItemComponentProps {
    item: ListItemType;
    onAdd: (ean: string) => void;
    onRemove: (ean: string) => void;
    onDelete: (ean: string) => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({ item, onAdd, onRemove, onDelete }) => {
    return (
        <ListItem key={item.ean}>
            <ListItemText
                primary={item.name}
                secondary={`Cantidad: ${item.quantity}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={() => onAdd(item.ean)}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton edge="end" aria-label="remove" onClick={() => onRemove(item.ean)}>
                    <RemoveCircleIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.ean)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ListItemComponent;
