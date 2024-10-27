"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  Box,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { setListName, clearList } from "../../redux/store/listSlice";
import { selectList } from "../../redux/store/multipleListsSlice";
import ProductList from "./ProductList";
import TotalPrice from "./TotalPrice";
import Filters from "./Filters";
import ListSelector from "./ListSelector";
import SaveListDialog from "./SaveListDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import NotificationDialog from "./NotificationDialog";
import "./myList.css";
import axios from "axios";
import { fetchUserLists } from "../../utils/apiUtils";
import { Product } from "./types";

const MiLista: React.FC = () => {
  const list = useSelector((state: RootState) => state.list.items);
  const listName = useSelector((state: RootState) => state.list.name);
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
  const [editingEnabled, setEditingEnabled] = useState<boolean>(false);
  const [isListSaved, setIsListSaved] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false); // New state variable for delete dialog
  const [openNewListDialog, setOpenNewListDialog] = useState<boolean>(false); // New state variable for new list dialog
  const [pendingListId, setPendingListId] = useState<number | null>(null);
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
        const products_eans = list.map((item) => item.ean);
        const response = await axios.post("/api/list/getProducts", {
          products_eans: products_eans,
        });
        const productsWithQuantity = response.data.data.products.map(
          (product: Product) => {
            const localItem = list.find((item) => item.ean === product.ean);
            return {
              ...product,
              quantity: localItem ? localItem.quantity : 0,
            };
          }
        );
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [list]);

  useEffect(() => {
    if (user.userInfo?.id) {
      fetchUserLists(user.userInfo.id, dispatch);
    }
  }, [user, dispatch]);

  const handleListNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setListName(event.target.value));
    setIsListSaved(false);
  };

  const handleSaveList = async () => {
    try {
      const user_id = user.userInfo?.id;
      if (user_id === undefined || user_id === null) {
        console.error("User ID is not defined");
        return;
      }

      const productsToSave = list.map((item) => ({
        product_code: item.ean,
        amount: item.quantity,
      }));

      const endpoint = selectedListId
        ? "/api/list/updateList"
        : "/api/list/createList";
      const payload = selectedListId
        ? {
            user_id,
            grocery_list_id: selectedListId,
            name: listName,
            products: productsToSave,
          }
        : { user_id, name: listName, products: productsToSave };

      const response = await axios.post(endpoint, payload);

      console.log("List saved:", response.data);
      setIsListSaved(true);
      await fetchUserLists(user_id, dispatch);

      // Show modal with appropriate message
      setModalMessage(
        selectedListId
          ? "Su lista ha sido actualizada exitosamente"
          : "Su lista ha sido guardada exitosamente"
      );
      setOpenModal(true);
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const handleCreateNewList = async () => {
    dispatch(clearList());
    dispatch(selectList(null));
    setIsListSaved(true);
    setOpenNewListDialog(false); // Close the new list dialog
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPendingListId(null);
  };

  const handleDialogSave = async () => {
    await handleSaveList();
    if (pendingListId !== null) {
      dispatch(selectList(pendingListId));
    }
    handleDialogClose();
  };

  const handleDialogDiscard = () => {
    if (pendingListId !== null) {
      dispatch(selectList(pendingListId));
    }
    handleDialogClose();
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
      handleCreateNewList();
      await fetchUserLists(user_id, dispatch);
      setOpenDeleteDialog(false);

      // Show modal with appropriate message
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
    (total, product) => total + product.price * (product.quantity || 0),
    0
  );

  return (
    <Box m={1.5}>
      <Accordion>
        <AccordionSummary
          sx={{
            "& .MuiAccordionSummary-content": {
              justifyContent: "center",
            },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <h3>Filtros</h3>
        </AccordionSummary>
        <Filters
          selectedMarkets={selectedMarkets}
          handleMarketChange={handleMarketChange}
        />
      </Accordion>
      <Box mt={1.5}>
        <FormControl fullWidth>
          <InputLabel id="list-selector-label">Seleccionar lista</InputLabel>
          <ListSelector
            isListSaved={isListSaved}
            setPendingListId={setPendingListId}
            setOpenDialog={setOpenDialog}
            labelId="list-selector-label"
          />
        </FormControl>
      </Box>
      <Box mt={1.5}>
        <TextField
          label="Nombre de mi lista"
          value={listName}
          onChange={handleListNameChange}
          fullWidth
          disabled={editingEnabled}
        />
      </Box>
      <Box mt={1.5}>
        <TotalPrice totalPrice={totalPrice} />
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1.5}>
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
          onClick={handleSaveList}
        >
          {selectedListId ? "Actualizar lista" : "Guardar mi lista"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewListDialog(true)} // Open the new list dialog
        >
          Nueva lista
        </Button>
      </Box>
      <ProductList products={cheapestProducts} />
      <SaveListDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleSave={handleDialogSave}
        handleDiscard={handleDialogDiscard}
      />
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteList}
        title="Confirmar eliminación"
        content="Quieres eliminar tu lista de forma permanente?"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <ConfirmationDialog
        open={openNewListDialog}
        onClose={() => setOpenNewListDialog(false)}
        onConfirm={handleCreateNewList}
        title="Confirmar nueva lista"
        content="Quieres comenzar una nueva lista?"
        confirmText="Comenzar"
        cancelText="Cancelar"
        confirmButtonColor="#B8860B" // Darker yellow
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
