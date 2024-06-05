import React from "react";
import { useEffect } from "react";
import { AppBar, Box, Typography, ButtonBase, useMediaQuery } from "@mui/material";
import SearchBar from "./SearchBar";
import "./nav_bar.css";

const NavBar = ({query_param} : {query_param: string | null}) => {
    /** This is for keeping the query when it changes pages */
    const [query, setQuery] = React.useState<string | null>(query_param);
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
    }; // Don't show the NavBar until it's ready.

    return (
        <AppBar position='sticky' color='primary' elevation={0}>
            {isMobile ? (
                <Box display='flex' flexDirection='column' alignItems='center' paddingTop='1%'>
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
            ) : (
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
            )
            }
        </AppBar>
    );
};

export default NavBar;
