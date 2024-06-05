import React from "react";
import { AppBar, Box, Typography, Button, ButtonBase } from "@mui/material";
import SearchBar from "./SearchBar";
import "./nav_bar.css";

const NavBar = ({query_param} : {query_param: string | null}) => {
    /** This is for keeping the query when it changes pages */
    const [query, setQuery] = React.useState<string | null>(query_param); 

    return (
        <AppBar position="sticky" color="primary" elevation={0}>
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
                <Box
                    display='flex'
                    justifyContent='center'
                    width='10vw'
                    >
                    <Typography variant="h6" align="center">
                        Sobre nosotros
                    </Typography>
                </Box>
            </Box>
        </AppBar>
    );
};

export default NavBar;
