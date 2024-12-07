import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { fetch_async, post_async_with_body } from "@/utils/common/fetch_async";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchUserLists } from "@/utils/apiUtils";
import Loading from "@/app/loadingScreens/loading";
import { clearList, setListName } from "@/redux/store/listSlice";
import { selectList } from "@/redux/store/multipleListsSlice";

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

      const endpoint = "/grocery_lists/create";
      const payload = {
        user_id: user_id,
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
      id="create-list-dialog"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        id="create-list-container"
      >
        <DialogTitle id="dialog-title">
          <Typography variant="h5" component="h2" id="dialog-title-text">
            {isLoading ? "Creando Lista" : "Nueva Lista"}
          </Typography>
        </DialogTitle>
        <Box p={"10px"} id="create-list-input">
          {isLoading ? (
            <Box id="loading-create-new-list">
              <Loading />
            </Box>
          ) : (
            <Box>
              <TextField
                id="filled-basic"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    await handleCreateNewList();
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Box>

      {!isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            height: "100%",
            backgroundColor: "#0289d1",
          }}
          onClick={handleCreateNewList}
        >
          <Button autoFocus fullWidth>
            <Typography variant="h5" color="white">
              Crear
            </Typography>
          </Button>
        </Box>
      ) : null}
    </Dialog>
  );
};
