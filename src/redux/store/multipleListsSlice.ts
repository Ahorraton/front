import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface List {
  id: number;
  user_id: number;
  name: string;
}

interface MultipleListsState {
  lists: List[];
  selectedListId: number | null;
}

const initialState: MultipleListsState = {
  lists: [],
  selectedListId: null,
};

const multipleListsSlice = createSlice({
  name: "multipleLists",
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
    selectList: (state, action: PayloadAction<number | null>) => {
      state.selectedListId = action.payload;
    },
    clearList: (state) => {
      state.selectedListId = null;
      state.lists = [];
    },
  },
});

export const { setLists, selectList, clearList } = multipleListsSlice.actions;
export default multipleListsSlice.reducer;
