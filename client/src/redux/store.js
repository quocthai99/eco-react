import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";

import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";
import appSlice from "./app/appSlice";
import authSlice from "./auth/authSlice";

const persistConfig = {
  key: "shoptech",
  storage,
};

const authConfig = {
  ...persistConfig,
  whitelist: ['login']
};
const userConfig = {
  ...persistConfig,
  whitelist: ['getCurrent']
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authSlice),
    category: categorySlice,
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    }),
});

export default store;
