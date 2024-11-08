import React from "react";
import { AppBar, useMediaQuery } from "@mui/material";
import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";

const NavBar = ({ query_param }: { query_param: string }) => {
  const [query, setQuery] = React.useState<string>(query_param);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppBar position="sticky" color="primary" elevation={0} id="nav-bar">
      {isMobile ? (
        <NavBarMobile query={query} setQuery={setQuery} />
      ) : (
        <NavBarDesktop query={query} setQuery={setQuery} />
      )}
    </AppBar>
  );
};

export default NavBar;
