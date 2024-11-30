// AuthChoiceModal.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface AuthChoiceModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
    onRegister: () => void;
}

const AuthChoiceModal: React.FC<AuthChoiceModalProps> = ({ open, onClose, onLogin, onRegister }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="auth-choice-dialog-title"
            aria-describedby="auth-choice-dialog-description"
        >
            <DialogTitle id="auth-choice-dialog-title">Guardar lista</DialogTitle>
            <DialogContent>
                <DialogContentText id="auth-choice-dialog-description">
                    Es necesario iniciar sesión para guardar tu lista
                </DialogContentText>
            </DialogContent>
            <DialogActions 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onRegister} color="primary" autoFocus>
                    Crear cuenta
                </Button>
                <Button onClick={onLogin} color="primary">
                    Ingresar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthChoiceModal;
