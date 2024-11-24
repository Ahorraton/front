import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { ListItemType } from "@/app/types/ListItem";
import axios from "axios";
import { fetchUserLists } from "@/utils/apiUtils";
import {
  Box,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ListSelector from "@/app/miLista/ListSelector";

interface ListActionsProps {
  listName: string;
  list: ListItemType[];
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
          amount: item.amount,
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
      }
      // finally {
      //   window.location.href = "/miLista";
      // }
    } else {
      onSaveList();
    }
  };

  const [selectedList, setSelectedList] = useState<string>(listName);
  const [isListSaved, setIsListSaved] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pendingListId, setPendingListId] = useState<number | null>(null);

  return (
    <Box textAlign="center" m={2}>
      <Box id="select-list-container" className="select-list-container">
        <FormControl fullWidth>
          {/* <InputLabel id="selected-list-label">Lista Seleccionada</InputLabel> */}

          <ListSelector
            isListSaved={isListSaved}
            setPendingListId={setPendingListId}
            setOpenDialog={setOpenDialog}
          />
        </FormControl>
      </Box>

      <IconButton color="primary" onClick={handleSaveList}>
        <SaveIcon />
        {isLoggedIn ? "Guardar" : "Inicia sesion para guardar"}
      </IconButton>
    </Box>
  );
};

export default ListActions;
