import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import cookieStorage from "./cookieStorage";
import userReducer from "./userSlice";
import listReducer from "./listSlice";
import multipleListsReducer from "./multipleListsSlice";

const persistConfig = {
  key: "root",
  storage: cookieStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
  multipleLists: multipleListsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
