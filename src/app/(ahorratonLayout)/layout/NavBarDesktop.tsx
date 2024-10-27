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
    <Box
      className="nav-bar-layout"
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
        <SearchBar
          starting_query={query}
          set={setQuery}
          compareSearch={compareSearch}
          setCompareSearch={setCompareSearch}
        />
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
