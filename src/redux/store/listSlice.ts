import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListItem {
    id?: string;
    name?: string;
    quantity: number;
    price?: number;
    ean: string; // Changed to required
    image_url?: string;
    urls?: string;
    market_price?: string; // We have the price here (e.g. coto 2500)
}

interface ListState {
    name: string;
    items: ListItem[];
}

const initialState: ListState = {
    name: 'Mi lista',
    items: [],
};

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ListItem>) => {
            const existingItem = state.items.find(item => item.ean === action.payload.ean);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const existingItem = state.items.find(item => item.ean === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => item.ean !== action.payload);
                }
            }
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.ean !== action.payload);
        },
        clearList: (state) => {
            state.items = [];
        },
        setListName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
});

export const { addItem, removeItem, deleteItem, clearList, setListName } = listSlice.actions;
export default listSlice.reducer;
