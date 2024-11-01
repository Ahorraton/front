import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);    
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coindicen.');
            return;
        }

        try {
            const response = await axios.post('api/user/register', {
                username,
                password,
            });
            console.log(response.data);
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
                    Crear cuenta
                </Typography>
                {error && (
                    <Typography color="error">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre de usuario"
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Confirmar contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear cuenta
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default RegisterModal;
