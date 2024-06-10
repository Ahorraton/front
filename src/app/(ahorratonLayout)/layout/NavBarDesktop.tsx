import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import './nav_bar.css';

const NavBarDesktop = ({
        query,
        setQuery
    }
    : {
        query: string | null,
        setQuery: React.Dispatch<React.SetStateAction<string | null>>
    }) => {
    return (
        <Box className="nav-bar-layout">
            {/** These components HAVE to sum up 100vw */}
            <Box className='title-layout' width='20vw'>
                <ButtonBase disableRipple href="/">
                    <Typography variant="h1">
                        Ahorratón 🐭
                    </Typography>
                </ButtonBase>
            </Box>
            <Box width='70vw'>
                <SearchBar starting_query={query} set={setQuery} />
            </Box>
            <Box className='about-us-layout' width='10vw' >
                <Typography variant="h6" align="center">
                    Sobre nosotros
                </Typography>
            </Box>
        </Box>
    )
};

export default NavBarDesktop;