import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import './nav_bar.css';


const NavBarMobile = ({
        query,
        setQuery,
        compareSearch,
        setCompareSearch,
    }
    : {
        query: string,
        setQuery: React.Dispatch<React.SetStateAction<string>>,
        compareSearch: boolean,
        setCompareSearch: (e:boolean) => void,
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
                <SearchBar
                    starting_query={query}
                    set={setQuery}
                    compareSearch={compareSearch}
                    setCompareSearch={setCompareSearch}
                    />
            </Box>
            <br />
        </Box>
    )
};

export default NavBarMobile;