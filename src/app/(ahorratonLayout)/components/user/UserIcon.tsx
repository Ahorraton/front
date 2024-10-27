import React, { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { RootState, AppDispatch } from "../../../../redux/store";
import { logout } from "../../../../redux/store/userSlice";
import { clearList } from "../../../../redux/store/multipleListsSlice";
import { clearList as clearDrawerList } from "@/redux/store/listSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RegisterModal from "./register/RegisterModal";
import LoginModal from "./login/LoginModal";

const UserIcon: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
      dispatch(clearList()); // Reset selected list
      dispatch(clearDrawerList());
      handleMenuClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
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
        {isLoggedIn ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          [
            <MenuItem key="login" onClick={handleLoginOpen}>
              Login
            </MenuItem>,
            <MenuItem key="register" onClick={handleRegisterOpen}>
              Register
            </MenuItem>,
          ]
        )}
      </Menu>
      <RegisterModal open={isRegisterModalOpen} onClose={handleRegisterClose} />
      <LoginModal open={isLoginModalOpen} onClose={handleLoginClose} />
    </div>
  );
};

export default UserIcon;
