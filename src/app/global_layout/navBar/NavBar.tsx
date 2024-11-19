import React from "react";
import { AppBar, Box, useMediaQuery } from "@mui/material";
import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";

const NavBar = ({ query_param }: { query_param: string }) => {
  const [query, setQuery] = React.useState<string>(query_param);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const currentPath = window.location.pathname;

  return (
    <AppBar position="sticky" color="primary" elevation={0} id="nav-bar">
      {isMobile ? (
        <NavBarMobile
          query={query}
          setQuery={setQuery}
          isHomeScreen={currentPath === "/"}
        />
      ) : (
        <NavBarDesktop
          query={query}
          setQuery={setQuery}
          isHomeScreen={currentPath === "/"}
        />
      )}
    </AppBar>
  );
};

export default NavBar;
