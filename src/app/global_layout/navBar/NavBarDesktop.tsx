import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import UserIcon from "../../(ahorratonLayout)/components/user/UserIcon";
import ListIcon from "../../(ahorratonLayout)/components/list/ListIcon";
import { useSelector } from "react-redux";
import NavBarProps from "./NavBarProps";
import "./nav_bar.css";
import { RootState } from "@/redux/store";

const NavBarDesktop: React.FC<NavBarProps> = ({
  query,
  setQuery,
  isHomeScreen,
}) => {
  const user = useSelector((state: RootState) => state.user);
  console.log(
    "Hola desde NavBarDesktop.tsx, user.userInfo?.username: ",
    user
  )
  return (
    <Box>
      {isHomeScreen ? (
        <Box className="nav-bar-desktop" id="nav-bar-desktop-style">
          <Box
            className="about-us-layout"
            flex="0.8"
            display="flex"
            justifyContent="right"
            padding="10px"
          >
            <Box display='flex' flexDirection='column' alignItems='center' marginRight={5}>
              <ListIcon />
              <Typography variant="h6" className="title-text" marginTop={1}>
                Mi lista
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <UserIcon />
              <Typography variant="h6" className="title-text" marginTop={1}>
                Mi usuario
              </Typography>              
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className="nav-bar-desktop" id="nav-bar-desktop-style">
          <Box className="title-layout" flex="1">
            <ButtonBase disableRipple href="/" className="title-hover">
              <Box
                component="img"
                src="/images/rats/fucking-rat.svg"
                alt="No products found"
                sx={{ height: "5rem", width: "auto", marginRight: "10px", filter: "invert(1)"}}
                className="spin-on-hover"
              />
              <Typography variant="h1">Ahorratón</Typography>
            </ButtonBase>
          </Box>
          <Box flex="2" display="flex" justifyContent="center">
            <SearchBar starting_query={query} set={setQuery} />
          </Box>
          <Box
            className="about-us-layout"
            flex="0.8"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            padding="10px"
          >
            <Box display='flex' flexDirection='column' alignItems='center'>
              <ListIcon />
              <Typography variant="h6" className="title-text" marginTop={1}>
                Mi lista
              </Typography>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='center'>
              <UserIcon />
              <Typography variant="h6" className="title-text" marginTop={1}>
                Mi usuario
              </Typography>              
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NavBarDesktop;
