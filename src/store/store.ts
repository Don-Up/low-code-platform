import { configureStore } from "@reduxjs/toolkit";
import componentSlice from "./componentSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, componentSlice);

export const store = configureStore({
    reducer: {
        comp: persistedReducer,
    },
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