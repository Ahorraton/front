import React from "react";
import { useEffect } from "react";
import { AppBar, Box, Typography, useMediaQuery } from "@mui/material";
import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";
import "./nav_bar.css";

const NavBar = ({ query_param }: { query_param: string }) => {
  /** This is for keeping the query when it changes pages */
  const [query, setQuery] = React.useState<string>(query_param);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{ backgroundColor: "#02c0ff" }}
      id="nav-bar"
    >
      {isMobile ? (
        <NavBarMobile query={query} setQuery={setQuery} />
      ) : (
        <NavBarDesktop query={query} setQuery={setQuery} />
      )}
    </AppBar>
  );
};

export default NavBar;
