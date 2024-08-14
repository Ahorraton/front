import React, { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { RootState, AppDispatch } from '../../../../redux/store';
import { login, logout } from '../../../../redux/store/userSlice';

const UserIcon: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch: AppDispatch = useDispatch();

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        dispatch(login());
        handleMenuClose();
    };

    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
    };

    return (
        <div>
            <IconButton onClick={handleMenuOpen}>
                <Avatar />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {isLoggedIn ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                        <MenuItem>Register</MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default UserIcon;
