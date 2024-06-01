import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";

const persistConfig = {
  key: "shoptech",
  storage,
};

const userConfig = {
  ...persistConfig,
};

const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice),
    category: categorySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
