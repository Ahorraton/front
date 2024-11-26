"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductList from "./product_card/ProductList";
import TotalPrice from "./TotalPrice";
import Filters from "./Filters";
import ListSelector from "./ListSelector";
import ConfirmationDialog from "./ConfirmationDialog";
import NotificationDialog from "./NotificationDialog";
import "./myList.css";
import axios from "axios";
import { fetchUserLists } from "../../utils/apiUtils";
import { Product } from "@/app/types/Product";
import { ListItemType } from "../types/ListItem";
import NewListModal from "./NewListModal";
import { clearSelectedList } from "../../redux/store/multipleListsSlice";
import { clearList } from "../../redux/store/listSlice";

const MiLista: React.FC = () => {
  const selectedList = useSelector((state: RootState) => state.list.items);
  const selectedListId = useSelector(
    (state: RootState) => state.multipleLists.selectedListId
  );
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([
    "carrefour",
    "coto",
    "dia",
    "vea",
    "disco",
    "jumbo",
  ]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // New state variable for delete dialog
  const [openNewListDialog, setOpenNewListDialog] = useState<boolean>(false); // New state variable for new list dialog
  const [modalMessage, setModalMessage] = useState<string>(""); // State variable for modal message
  const [openModal, setOpenModal] = useState<boolean>(false); // State variable for modal visibility

  useEffect(() => {
    if (!user.isLoggedIn) {
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const list_product_eans: string[] = selectedList.map(
          (item: ListItemType) => item.ean
        );
        const response = await axios.post("/api/list/fetchListProducts", {
          products_eans: list_product_eans,
        });
        const productsWithAmount = response.data.data.products.map(
          (product: Product) => {
            const localItem = selectedList.find(
              (item: ListItemType) => item.ean === product.ean
            );
            return {
              ...product,
              amount: localItem ? localItem.amount : 0,
            };
          }
        );
        setProducts(productsWithAmount);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedList]);

  useEffect(() => {
    if (user.userInfo?.id) {
      fetchUserLists(user.userInfo.id, dispatch);
    }
  }, [user, dispatch]);

  const handleUpdateList = async () => {
    try {
      const user_id = user.userInfo?.id;

      if (user_id === undefined || user_id === null) {
        console.error("User ID is not defined");
        return;
      }

      if (selectedListId === undefined || selectedListId === null) {
        console.error("No list selected");
        return;
      }

      const productsToSave = selectedList.map((item: ListItemType) => ({
        product_code: item.ean,
        amount: item.amount,
      }));

      const payload = {
            user_id,
            grocery_list_id: selectedListId,
            products: productsToSave,
          };

      const response = await axios.post("/api/list/updateList", payload);

      await fetchUserLists(user_id, dispatch);

      setModalMessage("Su lista ha sido actualizada exitosamente");
      setOpenModal(true);
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const handleMarketChange = (market: string) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((m) => m !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };

  const handleDeleteList = async () => {
    try {
      const user_id = user.userInfo?.id;
      if (user_id === undefined || user_id === null) {
        console.error("User ID is not defined");
        return;
      }

      const endpoint = "/api/list/deleteList";
      const response = await axios.delete(endpoint, {
        params: { grocery_list_id: selectedListId },
      });

      console.log("List deleted:", response.data);
      await fetchUserLists(user_id, dispatch);
      setOpenDeleteDialog(false);
      // dispatch(clearSelectedList());
      // dispatch(clearList());

      setModalMessage("Su lista ha sido eliminada exitosamente");
      setOpenModal(true);
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    selectedMarkets.includes(product.market)
  );

  const cheapestProducts = Object.values(
    filteredProducts.reduce((acc, product) => {
      if (!acc[product.ean] || acc[product.ean].price > product.price) {
        acc[product.ean] = product;
      }
      return acc;
    }, {} as { [key: string]: Product })
  );

  const totalPrice = cheapestProducts.reduce(
    (total, product) => total + product.price * (product.amount || 0),
    0
  );

  return (
    <Box m={1.5}>
      <Filters
        selectedMarkets={selectedMarkets}
        handleMarketChange={handleMarketChange}
      />
      <Box mt={1.5}>
        <Box mt={1.5}>
          <TotalPrice totalPrice={totalPrice} />
        </Box>
        <FormControl fullWidth>
            <InputLabel id="list-selector-label">Seleccionar lista</InputLabel>
            <ListSelector/>
          </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between" margin='1%'>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDeleteDialog(true)}
        >
          Eliminar lista
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleUpdateList}
        >
          Actualizar lista
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewListDialog(true)}
        >
          Nueva lista
        </Button>
      </Box>
      <ProductList products={cheapestProducts} />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteList}
        title="Confirmar eliminación"
        content="Quieres eliminar tu lista de forma permanente?"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <NewListModal
            userId={user.userInfo?.id ?? 0}
            open={openNewListDialog}
            onClose={() => 
              setOpenNewListDialog(false)
            }
      />
      <NotificationDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        message={modalMessage}
      />
    </Box>
  );
};

export default MiLista;
