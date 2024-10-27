// NotificationDialog.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface NotificationDialogProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({ open, onClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Completado!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationDialog;