import React, { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  Box,
  MenuItem,
  IconButton,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { RootState, AppDispatch } from "../../../../redux/store";
import { logout } from "../../../../redux/store/userSlice";
import { clearLists } from "../../../../redux/store/multipleListsSlice";
import { clearList } from "@/redux/store/listSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RegisterModal from "./register/RegisterModal";
import LoginModal from "./login/LoginModal";
import UserAlert from "./UserAlert";

const UserIcon: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch: AppDispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width:600px)");
  const scale = isMobile ? 1.2 : 1.5;

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setIsLoginModalOpen(true);
    handleMenuClose();
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegisterOpen = () => {
    setIsRegisterModalOpen(true);
    handleMenuClose();
  };

  const handleRegisterClose = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get("api/user/logout");
      dispatch(logout());
      dispatch(clearLists());
      dispatch(clearList());
      handleMenuClose();
      setShowGoodbye(true);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
    <div>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        style={{ transform: `scale(${scale})` }}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box display='flex' flexDirection='column' alignItems='center'>
          {isLoggedIn ? (
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          ) : (
            [
              <MenuItem key="login" onClick={handleLoginOpen}>
                Ingresar
              </MenuItem>,
              <MenuItem key="register" onClick={handleRegisterOpen}>
                Crear cuenta
              </MenuItem>,
            ]
          )}
        </Box>
      </Menu>
      <RegisterModal open={isRegisterModalOpen} onClose={handleRegisterClose} />
      <LoginModal open={isLoginModalOpen} onClose={handleLoginClose} />
    </div>
    <UserAlert 
      message={"¡Gracias, vuelva prontos!"} 
      severity={"info"} 
      showAlert={showGoodbye} 
      setShowAlert={setShowGoodbye}
    />
    </>
  );
};

export default UserIcon;
