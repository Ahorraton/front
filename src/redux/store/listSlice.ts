import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ListItemType, ListState } from "@/app/types/ListItem";

const initialState: ListState = {
  name: "Mi lista",
  items: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ListItemType>) => {
      const existingItem = state.items.find(
        (item) => item.ean === action.payload.ean
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // post to api the new change
    },
    addItems: (state, action: PayloadAction<ListItemType[]>) => {
      action.payload.forEach((item) => {
        const existingItem = state.items.find((i) => i.ean === item.ean);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push(item);
        }
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.ean === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.ean !== action.payload
          );
        }
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.ean !== action.payload);
    },
    clearList: (state) => {
      state.items = [];
      state.name = "Mi nueva lista";
    },
    setListName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setList: (state, action: PayloadAction<ListItemType[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  addItems,
  removeItem,
  deleteItem,
  clearList,
  setListName,
  setList,
} = listSlice.actions;
export default listSlice.reducer;
