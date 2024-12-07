import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import UserIcon from "../../(ahorratonLayout)/components/user/UserIcon";
import ListIcon from "../../(ahorratonLayout)/components/list/ListIcon";
import "./nav_bar.css";
import NavBarProps from "./NavBarProps";

const NavBarMobile: React.FC<NavBarProps> = ({
  query,
  setQuery,
  isHomeScreen,
}) => {
  return (
    <Box>
      {isHomeScreen ? (
        <Box className="nav-bar-mobile" id="nav-bar-mobile-style">
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
            </ButtonBase>

            <UserIcon />
          </Box>
        </Box>
      ) : (
        <Box className="nav-bar-mobile" id="nav-bar-mobile-style">
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
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Typography
                  variant="h6"
                  className="title-text"
                  sx={{ fontSize: "1.5rem" }}
                >
                  Ahorratón
                </Typography>
              </Box>
            </ButtonBase>

            <UserIcon />
          </Box>

          <Box
            width="100%"
            padding="10px"
            display="flex"
            justifyContent="center"
          >
            <SearchBar starting_query={query} set={setQuery} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavBarMobile;
