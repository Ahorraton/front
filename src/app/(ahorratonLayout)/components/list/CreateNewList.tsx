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
import { post_async_with_body } from "@/utils/common/fetch_async";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUserLists } from "@/utils/apiUtils";
import Loading from "@/app/loadingScreens/loading";

interface CreateNewListProps {
  open: boolean;
  onClose: () => void;
}

export const CreateNewList: React.FC<CreateNewListProps> = ({
  open,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [newListID, setNewListID] = useState<number | null>(null);

  useEffect(() => {
    console.log(`Created new listID: ${newListID}`);
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
      setNewListID(listID);
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const handleCreateNewList = async () => {
    if (!inputValue) {
      return;
    }
    setInputValue("");
    setIsLoading(true);
    await postList(inputValue);
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
