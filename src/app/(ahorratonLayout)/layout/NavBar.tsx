import React from "react";
import { useEffect } from "react";
import { AppBar, Box, Typography, useMediaQuery } from "@mui/material";
import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";
import "./nav_bar.css";

const NavBar = ({query_param} : {query_param: string}) => {
    /** This is for keeping the query when it changes pages */
    const [query, setQuery] = React.useState<string>(query_param);
    const [isReady, setIsReady] = React.useState(false);
    const isMobile = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return (
            <Box display='flex' justifyContent='center'>
                <Typography variant='h1' gutterBottom paddingTop='1%'>
                    Cargando...
                </Typography>
            </Box>
        );
    }; // Don't show the NavBar until it's ready. (mega placeholder)

    return (
        <AppBar position='sticky' color='primary' elevation={0}>
            {isMobile ? (
                <NavBarMobile query={query} setQuery={setQuery} />
            ) : (
                <NavBarDesktop query={query} setQuery={setQuery} />
            )
            }
        </AppBar>
    );
};

export default NavBar;
