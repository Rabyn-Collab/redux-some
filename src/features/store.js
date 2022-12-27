import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";






export const store = configureStore({
  reducer: {
    [movieSlice.reducerPath]: movieSlice.reducer
  },
  middleware: (getDefault) => getDefault().concat([
    movieSlice.middleware,
  ])
});