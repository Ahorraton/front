import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import './nav_bar.css';


const NavBarMobile = ({
        query,
        setQuery
    }
    : {
        query: string,
        setQuery: React.Dispatch<React.SetStateAction<string>>
    }) => {
    return (
        <Box className='nav-bar-layout-mobile'>
            <Box className='title-layout'>
                <ButtonBase disableRipple href="/">
                    <Typography variant="h1">
                        Ahorratón 🐭
                    </Typography>
                </ButtonBase>
            </Box>
            <br />
            <Box width='80vw'>
                <SearchBar starting_query={query} set={setQuery} />
            </Box>
            <br />
        </Box>
    )
};

export default NavBarMobile;