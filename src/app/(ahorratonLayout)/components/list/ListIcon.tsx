import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { addItem, removeItem, deleteItem, clearList, setListName } from '../../../../redux/store/listSlice';
import LoginModal from '../user/login/LoginModal';
import RegisterModal from '../user/register/RegisterModal';
import AuthChoiceModal from './AuthChoiceModal';

const ListIcon: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [clearDialogOpen, setClearDialogOpen] = useState(false);
    const [authChoiceDialogOpen, setAuthChoiceDialogOpen] = useState(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const list = useSelector((state: RootState) => state.list.items);
    const listName = useSelector((state: RootState) => state.list.name);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleAddItem = (id: string) => {
        const item = list.find(item => item.id === id);
        if (item) {
            dispatch(addItem({ ...item, quantity: 1 }));
        }
    };

    const handleRemoveItem = (id: string) => {
        const item = list.find(item => item.id === id);
        if (item) {
            if (item.quantity > 1) {
                dispatch(removeItem(id));
            } else {
                setItemToDelete(id);
                setDialogOpen(true);
            }
        }
    };

    const handleDeleteItem = (id: string) => {
        setItemToDelete(id);
        setDialogOpen(true);
    };

    const confirmDeleteItem = () => {
        if (itemToDelete) {
            dispatch(deleteItem(itemToDelete));
            setItemToDelete(null);
        }
        setDialogOpen(false);
    };

    const handleClearList = () => {
        setClearDialogOpen(true);
    };

    const confirmClearList = () => {
        dispatch(clearList());
        setClearDialogOpen(false);
    };

    const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(event.target.value));
    };

    const handleSaveList = () => {
        if (!user.isLoggedIn) {
            setAuthChoiceDialogOpen(true);
        } else {
            // Save the list logic here
        }
    };

    const handleAuthChoiceClose = () => {
        setAuthChoiceDialogOpen(false);
    };

    const handleLoginClose = () => {
        setLoginDialogOpen(false);
    };

    const handleRegisterClose = () => {
        setRegisterDialogOpen(false);
    };

    const handleLogin = () => {
        setAuthChoiceDialogOpen(false);
        setLoginDialogOpen(true);
    };

    const handleRegister = () => {
        setAuthChoiceDialogOpen(false);
        setRegisterDialogOpen(true);
    };

    return (
        <Box>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <ShoppingCartIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box width={300} role="presentation">
                    <Box textAlign="center" m={2}>
                        <TextField
                            label="Nombre de mi lista"
                            value={listName}
                            onChange={handleListNameChange}
                            fullWidth
                        />
                    </Box>
                    <List>
                        {list.map(item => (
                            <ListItem key={item.id}>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="add" onClick={() => handleAddItem(item.id)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveItem(item.id)}>
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Box textAlign="center" m={2}>
                        <Typography variant="h6">Total: ${list.reduce((total, item) => total + item.price * item.quantity, 0)}</Typography>
                        <IconButton color="secondary" onClick={handleClearList}>
                            <DeleteIcon /> Borrar mi lista
                        </IconButton>
                        <IconButton color="primary" onClick={handleSaveList}>
                            <SaveIcon /> Guardar mi lista
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Borrar Item"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Seguro que quieres eliminar el producto de tu lista?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmDeleteItem} color="primary" autoFocus>
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={clearDialogOpen}
                onClose={() => setClearDialogOpen(false)}
                aria-labelledby="alert-clear-dialog-title"
                aria-describedby="alert-clear-dialog-description"
            >
                <DialogTitle id="alert-clear-dialog-title">{"Borrar Lista"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-clear-dialog-description">
                        Seguro que quieres borrar toda tu lista?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setClearDialogOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmClearList} color="primary" autoFocus>
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
            <AuthChoiceModal
                open={authChoiceDialogOpen}
                onClose={handleAuthChoiceClose}
                onLogin={handleLogin}
                onRegister={handleRegister}
            />
            <LoginModal open={loginDialogOpen} onClose={handleLoginClose} />
            <RegisterModal open={registerDialogOpen} onClose={handleRegisterClose} />
        </Box>
    );
};

export default ListIcon;
