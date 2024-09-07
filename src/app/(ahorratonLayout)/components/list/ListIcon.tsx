import React, { useState } from 'react';
import { Box, Drawer, List, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { addItem, removeItem, deleteItem, clearList, setListName } from '../../../../redux/store/listSlice';
import LoginModal from '../user/login/LoginModal';
import RegisterModal from '../user/register/RegisterModal';
import AuthChoiceModal from './AuthChoiceModal';
import ListItemComponent from './ListItemComponent';
import ListActions from './ListActions';
import { ConfirmDialog } from './Dialogs';

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

    const handleSaveList = async () => {
        if (!user.isLoggedIn) {
            setAuthChoiceDialogOpen(true);
        } else {
            try {
                const response = await fetch('/api/save-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ list, username: user.userInfo?.username }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save the list');
                }

                const data = await response.json();
                console.log('List saved successfully:', data);

                dispatch(clearList());
                dispatch(setListName(''));
                alert('Lista guardada exitosamente');
            } catch (error) {
                console.error('Error saving the list:', error);
                alert('Error al guardar la lista');
            }
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
                    <ListActions
                        listName={listName}
                        total={list.reduce((total, item) => total + item.price * item.quantity, 0)}
                        onListNameChange={handleListNameChange}
                        onClearList={handleClearList}
                        onSaveList={handleSaveList}
                        isLoggedIn={user.isLoggedIn}
                    />
                    <List>
                        {list.map(item => (
                            <ListItemComponent
                                key={item.id}
                                item={item}
                                onAdd={handleAddItem}
                                onRemove={handleRemoveItem}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </List>
                </Box>
            </Drawer>
            <ConfirmDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={confirmDeleteItem}
                title="Borrar Item"
                description="Seguro que quieres eliminar el producto de tu lista?"
                confirmText="Borrar"
            />
            <ConfirmDialog
                open={clearDialogOpen}
                onClose={() => setClearDialogOpen(false)}
                onConfirm={confirmClearList}
                title="Borrar Lista"
                description="Seguro que quieres borrar toda tu lista?"
                confirmText="Borrar"
            />
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
