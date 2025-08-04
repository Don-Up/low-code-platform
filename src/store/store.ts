import { configureStore } from "@reduxjs/toolkit";
import componentSlice from "./componentSlice";
import langSlice  from "@/store/langSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import undoable, { includeAction } from "redux-undo";

const persistConfig = {
    key: "root",
    storage,
};

const undoableReducer = undoable(componentSlice, {
    filter: includeAction([
        "comp/setComponents",
        "comp/addComponent",
        "comp/updateComponent",
        "comp/clearComponents",
        "comp/swapComponent",
        "comp/removeComponent",
    ]),
    limit: 30,
});

const persistedReducer = persistReducer(persistConfig, undoableReducer);
const langReducer = persistReducer(persistConfig, langSlice)

export const store = configureStore({
    reducer: {
        comp: persistedReducer,
        lang: langReducer
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