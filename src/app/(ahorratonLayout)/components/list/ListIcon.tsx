import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Import ListAltIcon from Material-UI
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  addItem,
  removeItem,
  deleteItem,
  clearList,
  setListName,
  ListState,
} from "../../../../redux/store/listSlice";
import LoginModal from "../user/login/LoginModal";
import RegisterModal from "../user/register/RegisterModal";
import AuthChoiceModal from "./AuthChoiceModal";
import ListItemComponent from "./ListItemComponent";
import ListActions from "./ListActions";
import { ConfirmDialog } from "./Dialogs";

const ListIconComponent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [authChoiceDialogOpen, setAuthChoiceDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const list = useSelector((state: RootState) => state.list.items);
  const listName = useSelector((state: RootState) => state.list.name);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width:600px)");
  const scale = isMobile ? 1.2 : 1.5;

  const handleAddItem = (ean: string) => {
    const item = list.find((item) => item.ean === ean);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleRemoveItem = (ean: string) => {
    const item = list.find((item) => item.ean === ean);
    if (item) {
      if (item.quantity > 1) {
        dispatch(removeItem(ean));
      } else {
        setItemToDelete(ean);
        setDialogOpen(true);
      }
    }
  };

  const handleDeleteItem = (ean: string) => {
    setItemToDelete(ean);
    setDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    console.log("Deleting item with ean:", itemToDelete);
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete));
      setItemToDelete(null);
    }
    setDialogOpen(false);
  };

  const handleClearList = () => {
    setClearDialogOpen(true);
  };

  const confirmClearList = () => {
    dispatch(clearList());
    setClearDialogOpen(false);
  };

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setListName(event.target.value));
  };

  const handleSaveList = async () => {
    if (!user.isLoggedIn) {
      setAuthChoiceDialogOpen(true);
    } else {
      try {
        const response = await fetch("/api/save-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list, username: user.userInfo?.username }),
        });

        if (!response.ok) {
          throw new Error("Failed to save the list");
        }

        const data = await response.json();
        console.log("List saved successfully:", data);

        dispatch(clearList());
        dispatch(setListName(""));
        alert("Lista guardada exitosamente");
      } catch (error) {
        console.error("Error saving the list:", error);
        alert("Error al guardar la lista");
      }
    }
  };

  const handleAuthChoiceClose = () => {
    setAuthChoiceDialogOpen(false);
  };

  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

  const handleRegisterClose = () => {
    setRegisterDialogOpen(false);
  };

  const handleLogin = () => {
    setAuthChoiceDialogOpen(false);
    setLoginDialogOpen(true);
  };

  const handleRegister = () => {
    setAuthChoiceDialogOpen(false);
    setRegisterDialogOpen(true);
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        onClick={() => setDrawerOpen(true)}
        style={{ transform: `scale(${scale})` }}
      >
        <ListAltIcon /> {/* Use ListAltIcon instead of ListIcon */}
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box width={300} role="presentation">
          <ListActions
            listName={listName}
            list={list}
            onListNameChange={handleListNameChange}
            onClearList={handleClearList}
            onSaveList={handleSaveList}
            isLoggedIn={user.isLoggedIn}
          />
          <List>
            {list.map((item) => (
              <ListItemComponent
                key={item.ean}
                item={item}
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </List>
        </Box>
      </Drawer>
      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmDeleteItem}
        title="Borrar Item"
        description="Quieres eliminar el producto de tu lista?"
        confirmText="Borrar"
      />
      <ConfirmDialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        onConfirm={confirmClearList}
        title="Borrar Lista"
        description="Quieres borrar toda tu lista?"
        confirmText="Borrar"
      />
      <AuthChoiceModal
        open={authChoiceDialogOpen}
        onClose={handleAuthChoiceClose}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <LoginModal open={loginDialogOpen} onClose={handleLoginClose} />
      <RegisterModal open={registerDialogOpen} onClose={handleRegisterClose} />
    </Box>
  );
};

export default ListIconComponent;
