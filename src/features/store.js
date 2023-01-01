import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./movieSlice";
import showSlice from './movieSlice';



export const store = configureStore({
  reducer: {
    show: showSlice.reducer,
    [movieSlice.reducerPath]: movieSlice.reducer
  },
  middleware: (getDefault) => getDefault().concat([
    movieSlice.middleware,
  ])
});