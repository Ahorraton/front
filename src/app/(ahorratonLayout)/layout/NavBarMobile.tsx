import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import UserIcon from '../components/user/UserIcon';
import ListIcon from '../components/list/ListIcon';
import './nav_bar.css';

interface NavBarMobileProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    compareSearch: boolean;
    setCompareSearch: (e: boolean) => void;
}

const NavBarMobile: React.FC<NavBarMobileProps> = ({
    query,
    setQuery,
    compareSearch,
    setCompareSearch,
}) => {
    return (
        <Box className='nav-bar-layout-mobile'>
            <Box className='title-layout' width='100%' padding='10px' display='flex' alignItems='center'>
                <ButtonBase disableRipple href="/" className='title-button' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6" className='title-text' sx={{ fontSize: '1.5rem' }}>
                        Ahorratón 🐭
                    </Typography>
                </ButtonBase>
                <Box display='flex' alignItems='center'>
                    <ListIcon />
                    <UserIcon />
                </Box>
            </Box>
            <Box width='100%' padding='10px'>
                <SearchBar
                    starting_query={query}
                    set={setQuery}
                    compareSearch={compareSearch}
                    setCompareSearch={setCompareSearch}
                />
            </Box>
        </Box>
    );
};

export default NavBarMobile;