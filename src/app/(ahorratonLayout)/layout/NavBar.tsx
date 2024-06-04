import React from "react";
import { AppBar, Box, Typography, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import "./nav_bar.css";

const NavBar = () => {
    const handleSearch = () => {
        console.log("Searching...");
    }

    const set = (e: string) => {
        console.log(e);
    }

    return (
        <AppBar position="sticky" color='primary'>
            <Box className="nav-bar-layout">
                <Box className='title-layout'>
                    <Typography variant="h1" align="center" gutterBottom>
                        Ahorratón 🐭
                    </Typography>
                </Box>
                <Box width='70vw'>
                    <SearchBar set={set} handleSearch={handleSearch} />
                </Box>
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    width='10vw'
                    >
                    <Button>
                        <Typography color='black' variant="h6" align="center" gutterBottom>
                            Sobre nosotros
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </AppBar>
    );
};

export default NavBar;