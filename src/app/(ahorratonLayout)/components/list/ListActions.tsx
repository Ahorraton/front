import React from 'react';
import { Box, IconButton, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface ListActionsProps {
    listName: string;
    total: number;
    onListNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClearList: () => void;
    onSaveList: () => void;
}

const ListActions: React.FC<ListActionsProps> = ({ listName, total, onListNameChange, onClearList, onSaveList }) => {
    return (
        <Box textAlign="center" m={2}>
            <TextField
                label="Nombre de mi lista"
                value={listName}
                onChange={onListNameChange}
                fullWidth
            />
            <Typography variant="h6">Total: ${total}</Typography>
            <IconButton color="secondary" onClick={onClearList}>
                <DeleteIcon /> Borrar mi lista
            </IconButton>
            <IconButton color="primary" onClick={onSaveList}>
                <SaveIcon /> Guardar mi lista
            </IconButton>
        </Box>
    );
};

export default ListActions;
