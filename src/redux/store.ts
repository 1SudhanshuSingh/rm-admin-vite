import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(store);
