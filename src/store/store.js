import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userDataSlice from "./userDataSlice.js";

const store = configureStore({
  reducer: {
    cartSlice,
    userDataSlice,
  },
});

export default store;
