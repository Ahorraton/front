import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

type SaveListDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: () => void;
    handleDiscard: () => void;
};

const SaveListDialog: React.FC<SaveListDialogProps> = ({ open, handleClose, handleSave, handleDiscard }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Guardar lista</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    La lista actual no ha sido guardada. ¿Desea guardarla antes de cambiar a otra lista?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDiscard} color="primary">
                    Descartar
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveListDialog;
