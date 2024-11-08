import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import UserIcon from "../../(ahorratonLayout)/components/user/UserIcon";
import ListIcon from "../../(ahorratonLayout)/components/list/ListIcon";
import "./nav_bar.css";
import NavBarProps from "./NavBarProps";

const NavBarMobile: React.FC<NavBarProps> = ({ query, setQuery }) => {
  return (
    <Box className="nav-bar-mobile">
      <Box
        className="title-layout"
        width="100%"
        padding="10px"
        display="flex"
        alignItems="center"
      >
        <ListIcon />
        <ButtonBase
          disableRipple
          href="/"
          className="title-button"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <Typography
            variant="h6"
            className="title-text"
            sx={{ fontSize: "1.5rem" }}
          >
            Ahorratón 🐭
          </Typography>
        </ButtonBase>

        <UserIcon />
      </Box>
      <Box width="100%" padding="10px">
        <SearchBar starting_query={query} set={setQuery} />
      </Box>
    </Box>
  );
};

export default NavBarMobile;
