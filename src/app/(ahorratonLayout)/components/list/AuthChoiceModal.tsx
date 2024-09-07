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
            <DialogTitle id="auth-choice-dialog-title">{"Guardar Lista"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="auth-choice-dialog-description">
                    Necesitas iniciar sesión o registrarte para guardar tu lista. ¿Qué te gustaría hacer?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onLogin} color="primary">
                    Iniciar sesión
                </Button>
                <Button onClick={onRegister} color="primary" autoFocus>
                    Registrarse
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthChoiceModal;
