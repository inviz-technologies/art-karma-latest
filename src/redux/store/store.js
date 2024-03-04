// create RTK Tool kit store with middleware with typescript
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { userAuth } from "../apis/auth.api";
import allReducers from "../features/index";

import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
const persistConfig = {
  key: "root",
  storage,
  timeout: undefined,
  whitelist: [userAuth.reducerPath, "authSlice"],
};

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("persist:root");
    return allReducers(undefined, action);
  }
  return allReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userAuth.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch(); // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector;
