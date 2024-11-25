import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface NewListModalProps {
    userId: number | null | undefined;
    open: boolean;
    onClose: () => void;
}

const NewListModal: React.FC<NewListModalProps> = ({ userId, open, onClose }) => {
    const [nameList, setNameList] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleNameListChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameList(e.target.value);    
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/list/create', {
                user_id: userId,
                name: nameList,
            });
            if (response.data.data.grocery_list_id != undefined) {
                console.log(response.data.data.grocery_list_id);
            }
            setNameList('');
            onClose();
        } catch (error) {
            console.error(error);
            setError('Ha ocurrido un error. Por favor, intente nuevamente.');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Crear nueva lista
                </Typography>
                {error && (
                    <Typography color="error">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de la lista"
                        value={nameList}
                        onChange={handleNameListChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear lista
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default NewListModal;
