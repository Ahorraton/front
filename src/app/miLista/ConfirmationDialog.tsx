// ConfirmationDialog.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seguro que quieres eliminar tu lista de forma permanente?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;