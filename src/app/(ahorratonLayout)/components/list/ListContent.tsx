import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  addItem,
  removeItem,
  deleteItem,
  clearList,
  setListName,
} from "../../../../redux/store/listSlice";

import LoginModal from "../user/login/LoginModal";
import RegisterModal from "../user/register/RegisterModal";
import AuthChoiceModal from "./AuthChoiceModal";
import ListItemComponent from "./ListItemComponent";
import { ConfirmDialog } from "./Dialogs";
import { Box, Grid, List, Typography } from "@mui/material";
import "./list-style.css";
import { ListItemType } from "@/app/types/ListItem";
import { Product } from "@/app/types/Product";
import TotalPrice from "@/app/miLista/TotalPrice";
import { getCheapestItems } from "@/app/miLista/utils/cheapestItems";
import { calculateTotalPrice } from "@/app/miLista/utils/calculateTotalPrice";
import SelectListComponent from "./ListSelector";
import SaveListButton from "./SaveListAction";
import LogInOrSignUpAlert from "./LogInOrSignUpAlert";
import MoreOptions from "./MoreOptions";
import CreateList from "./createList";

const ListContent = () => {
  const selectedList = useSelector((state: RootState) => state.list.items);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [authChoiceDialogOpen, setAuthChoiceDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const listItems = useSelector((state: RootState) => state.list.items);
  const listName = useSelector((state: RootState) => state.list.name);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleAddItem = (ean: string) => {
    const item = listItems.find((item) => item.ean === ean);
    if (item) {
      dispatch(addItem({ ...item, amount: 1 }));
    }
  };

  const handleRemoveItem = (ean: string) => {
    const item = listItems.find((item) => item.ean === ean);
    if (item) {
      if (item.amount > 1) {
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

  const confirmClearList = () => {
    dispatch(clearList());
    setClearDialogOpen(false);
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
          body: JSON.stringify({
            list: listItems,
            username: user.userInfo?.username,
          }),
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

  const handleLogin = () => {
    setAuthChoiceDialogOpen(false);
    setLoginDialogOpen(true);
  };

  const handleRegister = () => {
    setAuthChoiceDialogOpen(false);
    setRegisterDialogOpen(true);
  };

  // Fix calculate value

  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "carrefour",
    "coto",
    "dia",
    "vea",
    "disco",
    "jumbo",
  ]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const prods: Product[] = listItems
      .map((item: ListItemType) => item.product)
      .filter((product): product is Product => product !== undefined);

    const cheapestItems: ListItemType[] = getCheapestItems(
      prods,
      selectedMarkets
    );
    const cheapestItemsProducts: Product[] = cheapestItems
      .map((item: ListItemType) => {
        if (item.product) {
          const localItem = selectedList.find(
            (savedItem: ListItemType) => savedItem.ean === item.ean
          );
          item.product.amount = localItem ? localItem.amount : 1;
        }
        return item.product;
      })
      .filter((product): product is Product => product !== undefined);

    const totalPrice: number = calculateTotalPrice(
      cheapestItemsProducts,
      selectedMarkets
    );

    // setCheapestProducts(cheapestItemsProducts);
    setTotalPrice(totalPrice);
  }, [listItems]);

  return (
    <Grid container className="slider-view-grid" id="slider-view-grid">
      {user.isLoggedIn ? (
        <Box className="list-content" id="list-content" role="presentation">
          <Grid container className="action-buttons">
            <CreateList />
            <SelectListComponent />

            <MoreOptions />
          </Grid>

          <List id="list-items-container" className="list-items-container">
            {listItems.map((item: ListItemType) => (
              <ListItemComponent
                key={item.ean}
                item={item}
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </List>

          <Box mt={1.5}>
            <TotalPrice totalPrice={totalPrice} />

            <SaveListButton
              listName={listName}
              list={listItems}
              onListNameChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setListName(event.target.value))
              }
              onClearList={() => setClearDialogOpen(true)}
              onSaveList={handleSaveList}
              isLoggedIn={user.isLoggedIn}
            />
          </Box>

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
            onClose={() => setAuthChoiceDialogOpen(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
          <LoginModal
            open={loginDialogOpen}
            onClose={() => setLoginDialogOpen(false)}
          />
          <RegisterModal
            open={registerDialogOpen}
            onClose={() => setRegisterDialogOpen(false)}
          />
        </Box>
      ) : (
        <LogInOrSignUpAlert />
      )}
    </Grid>
  );
};

export default ListContent;
