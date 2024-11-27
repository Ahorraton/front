import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../redux/store/userSlice';
import WelcomeAlert from '../UserAlert';
import { set } from 'lodash';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();

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
            const register_response = await axios.post('api/user/register', {
                username,
                password,
            });

            if (register_response.data.error) {
                setError(`El nombre de usuario ${username} ya se encuentra ocupado.`);
                return;
            }

            const login_response = await axios.post('api/user/login', {
                username,
                password,
            });
            const { _username, id } = login_response.data.user
            dispatch(login({ username: _username, id }));
            setShowAlert(true)
            setError('');
            onClose();
        } catch (error) {
            console.error(error);
            setError('Ha ocurrido un error. Por favor, intente nuevamente.');
        }
    };

    return (
        <>
        
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
        {showAlert && 
            <WelcomeAlert 
                severity={"success"} 
                message={`¡Hola, ${username}!`} 
                showAlert={showAlert} 
                setShowAlert={setShowAlert} 
            />
        }
        </>
    );
};

export default RegisterModal;