import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Input,
  Box,
} from "@mui/material";
import { fetch_async, post_async_with_body } from "@/utils/common/fetch_async";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUserLists } from "@/utils/apiUtils";
import Loading from "@/app/loadingScreens/loading";
import { Product } from "@/app/types/Product";
import { clearList, setList, setListName } from "@/redux/store/listSlice";
import { selectList } from "@/redux/store/multipleListsSlice";
import { getCheapestItems } from "@/app/miLista/utils/cheapestItems";

interface CreateNewListProps {
  open: boolean;
  onClose: () => void;
}

export const CreateNewList: React.FC<CreateNewListProps> = ({
  open,
  onClose,
}) => {
  const multipleLists = useSelector((state: RootState) => state.multipleLists);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [newListID, setNewListID] = useState<number | null>(null);

  useEffect(() => {
    if (!newListID) {
      return;
    }
    const fetchData = async () => {
      console.log("Inside new data", newListID);
      const selectedListId = Number(newListID);
      console.log(`Created new listID: ${newListID}`);
      try {
        const response = await fetch_async(
          `/grocery_lists/${newListID}/get_products`
        );
        console.log("Fetched list:", response);
        const selectedList = multipleLists.lists.find(
          (list) => list.id === selectedListId
        );
        if (selectedList) {
          dispatch(setListName(selectedList.name));
        }

        dispatch(selectList(selectedListId));

        await fetchUserLists(user?.userInfo?.id ?? 0, dispatch);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };
    dispatch(clearList());
    dispatch(selectList(null));
    fetchData();
  }, [newListID]);

  const postList = async (name: string) => {
    try {
      const user_id = user.userInfo?.id;
      if (user_id === undefined || user_id === null) {
        console.error("User ID is not defined");
        return;
      }

      const endpoint = "/grocery_lists/save_my_list";
      const payload = {
        user_id,
        name: name,
        products: [],
      };

      const response = await post_async_with_body(endpoint, payload);
      await fetchUserLists(user_id, dispatch);

      const listID: number = response.grocery_list_id;
      console.log(`New List ${listID}`);
      setNewListID(listID);
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const handleCreateNewList = async () => {
    if (!inputValue) {
      return;
    }
    console.log(`Creating Lista ${inputValue}`);

    setIsLoading(true);
    await postList(inputValue);
    setInputValue("");
    setIsLoading(false);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Box sx={{ alignItems: "center", justifyContent: "center" }}>
        <DialogTitle id="dialog-title">
          {isLoading ? "Creando Lista" : "Crear Nueva Lista"}
        </DialogTitle>
        <Box p={"10px"}>
          {isLoading ? (
            <Box id="loading-create-new-list">
              <Loading />
            </Box>
          ) : (
            <Box>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    await handleCreateNewList();
                  }
                }}
              />
              <Box>
                <DialogActions>
                  <Button onClick={onClose} color="primary">
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateNewList}
                    color="primary"
                    autoFocus
                  >
                    Crear
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};
