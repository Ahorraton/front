import React from "react";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { ListItem } from "@/redux/store/listSlice";
import axios from "axios";
import { fetchUserLists } from "@/utils/apiUtils";

interface ListActionsProps {
  listName: string;
  list: ListItem[];
  onListNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearList: () => void;
  onSaveList: () => void;
  isLoggedIn: boolean;
}

const ListActions: React.FC<ListActionsProps> = ({
  listName,
  list,
  onListNameChange,
  onClearList,
  onSaveList,
  isLoggedIn,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const selectedListId = useSelector(
    (state: RootState) => state.multipleLists.selectedListId
  );

  const handleSaveList = async () => {
    console.log("Saving list");
    if (isLoggedIn) {
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
        await fetchUserLists(user_id, dispatch);

        // Show modal with appropriate message
      } catch (error) {
        console.error("Error saving list:", error);
      } finally {
        window.location.href = "/miLista";
      }
    } else {
      onSaveList();
    }
  };

  return (
    <Box textAlign="center" m={2}>
      <TextField
        label="Nombre de mi lista"
        value={listName}
        onChange={onListNameChange}
        fullWidth
      />

      <IconButton color="primary" onClick={handleSaveList}>
        <SaveIcon />
        {isLoggedIn ? "Guardar" : "Inicia sesion para guardar"}
      </IconButton>
    </Box>
  );
};

export default ListActions;
