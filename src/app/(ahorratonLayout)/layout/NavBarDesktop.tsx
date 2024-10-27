import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import UserIcon from "../components/user/UserIcon";
import ListIcon from "../components/list/ListIcon";
import "./nav_bar.css";

interface NavBarDesktopProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  compareSearch: boolean;
  setCompareSearch: (e: boolean) => void;
}

const NavBarDesktop: React.FC<NavBarDesktopProps> = ({
  query,
  setQuery,
  compareSearch,
  setCompareSearch,
}) => {
  return (
    <Box className="nav-bar-layout">
      <Box className="title-layout" width="20vw">
        <ButtonBase disableRipple href="/" className="title-hover">
          <Typography variant="h1" className="spin-on-hover">
            🐭
          </Typography>
          <Typography variant="h1">Ahorratón</Typography>
        </ButtonBase>
      </Box>
      <Box width="70vw">
        <SearchBar
          starting_query={query}
          set={setQuery}
          compareSearch={compareSearch}
          setCompareSearch={setCompareSearch}
        />
      </Box>
      <Box
        className="about-us-layout"
        width="10vw"
        display="flex"
        justifyContent="flex-center"
        alignItems="center"
        padding="10px"
      >
        <Box mr={2}>
          <ListIcon />
        </Box>

        <UserIcon />
      </Box>
    </Box>
  );
};

export default NavBarDesktop;
