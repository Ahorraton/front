import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface ListState {
    items: ListItem[];
}

const initialState: ListState = {
    items: [],
};

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ListItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearList: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearList } = listSlice.actions;
export default listSlice.reducer;
