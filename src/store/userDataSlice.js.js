import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {},
  myorders: [],
};
const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = {};
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    clearOrders(state) {
      state.myorders = [];
    },
    addMyOrder(state, action) {
      state.myorders.push(action.payload);
    },
    addAllMyOrders(state, action) {
      state.myorders = action.payload;
    },
  },
});
export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
