import { configureStore } from "@reduxjs/toolkit";
import { tagsSlice } from "./slices/tagSlice";
import { slugsSlice } from "./slices/slugSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        tags:tagsSlice.reducer,
        slugs:slugsSlice.reducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
