import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import UserIcon from "../../(ahorratonLayout)/components/user/UserIcon";
import ListIcon from "../../(ahorratonLayout)/components/list/ListIcon";
import "./nav_bar.css";
import NavBarProps from "./NavBarProps";

const NavBarDesktop: React.FC<NavBarProps> = ({ query, setQuery }) => {
  return (
    <Box
      className="nav-bar-desktop"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box className="title-layout" flex="1" mr={2}>
        <ButtonBase disableRipple href="/" className="title-hover">
          <Typography variant="h1" className="spin-on-hover">
            🐭
          </Typography>
          <Typography variant="h1">Ahorratón</Typography>
        </ButtonBase>
      </Box>
      <Box flex="2">
        <SearchBar starting_query={query} set={setQuery} />
      </Box>
      <Box
        className="about-us-layout"
        flex="0.8"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="10px"
      >
        <Box mr={4}>
          <ListIcon />
        </Box>
        <UserIcon />
      </Box>
    </Box>
  );
};

export default NavBarDesktop;
