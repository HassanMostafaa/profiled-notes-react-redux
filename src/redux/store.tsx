import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "./currentUser/currentUserSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
  },
});
