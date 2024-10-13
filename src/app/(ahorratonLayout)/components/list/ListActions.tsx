import React from 'react';
import { Box, IconButton, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface ListActionsProps {
    listName: string;
    onListNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClearList: () => void;
    onSaveList: () => void;
    isLoggedIn: boolean;
}

const ListActions: React.FC<ListActionsProps> = ({ listName, onListNameChange, onClearList, onSaveList, isLoggedIn }) => {
    const handleSaveList = () => {
        console.log('Saving list');
        if (isLoggedIn) {
            window.location.href = '/miLista';
        } else {
            onSaveList();
        }
    };

    return (
        <Box textAlign="center" m={2}>
            <TextField
                label="Nombre de mi lista"
                value={listName}
                onChange={onListNameChange}
                fullWidth
            />
            <IconButton color="secondary" onClick={onClearList}>
                <DeleteIcon /> Borrar mi lista
            </IconButton>
            <IconButton color="primary" onClick={handleSaveList}>
                <SaveIcon /> {isLoggedIn ? 'Ver mi lista en detalle' : 'Guardar mi lista'}
            </IconButton>
        </Box>
    );
};

export default ListActions;
