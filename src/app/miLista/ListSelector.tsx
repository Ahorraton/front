import React, { useEffect } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { selectList, setLists } from "../../redux/store/multipleListsSlice";
import { setList, setListName } from "../../redux/store/listSlice";
import axios from "axios";
import { fetchUserLists } from "../../utils/apiUtils";
import { ListItemFromDB, ListItemType } from "@/app/types/ListItem";
import { Product } from "../types/Product";
import { getCheapestItems } from "./utils/cheapest_prod";

type ListSelectorProps = {
  isListSaved: boolean;
  setPendingListId: (id: number | null) => void;
  setOpenDialog: (open: boolean) => void;
};

const ListSelector: React.FC<ListSelectorProps> = ({
  isListSaved,
  setPendingListId,
  setOpenDialog,
}) => {
  const multipleLists = useSelector((state: RootState) => state.multipleLists);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleListChange = async (event: SelectChangeEvent<number>) => {
    const selectedListId = Number(event.target.value);

    if (!isListSaved) {
      setPendingListId(selectedListId);
      setOpenDialog(true);
    } else {
      try {
        const response = await axios.get(`/api/list/getList`, {
          params: { grocery_list_id: selectedListId },
        });
        console.log("Fetched list:", response.data.items);
        const selectedList = multipleLists.lists.find(
          (list) => list.id === selectedListId
        );
        if (selectedList) {
          dispatch(setListName(selectedList.name));
        }

        const prods: Product[] = response.data.items.map((item: Product) => ({
          ...item,
        }));

        dispatch(selectList(selectedListId));
        dispatch(setList(Array.from(getCheapestItems(prods))));

        await fetchUserLists(user?.userInfo?.id ?? 0, dispatch);

        // Save the selected list ID to cookies
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    }
  };

  return (
    <Select
      value={multipleLists.selectedListId || ""}
      onChange={handleListChange}
      displayEmpty
      fullWidth
    >
      {Array.isArray(multipleLists.lists) && multipleLists.lists.length > 0 ? (
        multipleLists.lists.map((selectedList) => (
          <MenuItem key={selectedList.id} value={selectedList.id}>
            {selectedList.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled value=""></MenuItem>
      )}
    </Select>
  );
};

export default ListSelector;
