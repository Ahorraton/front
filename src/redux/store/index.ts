import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import cookieStorage from './cookieStorage';
import userReducer from './userSlice';
import listReducer from './listSlice';
import multipleListsReducer from './multipleListsSlice';

const persistConfig = {
  key: 'root',
  storage: cookieStorage,
};

const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  list: persistReducer(persistConfig, listReducer),
  multipleLists: persistReducer(persistConfig, multipleListsReducer),
};

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
