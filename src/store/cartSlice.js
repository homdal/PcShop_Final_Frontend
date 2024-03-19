import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      let itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (state.items[itemIndex]) {
        state.items[itemIndex].amount += action.payload.amount;
      } else {
        state.items.push(action.payload);
      }
    },
    addArray(state, action) {
      state.items = action.payload;
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (item) => action.payload !== item.product._id
      );
    },
    removeAllItems(state) {
      state.items = [];
    },
    increaseItemAmount(state, action) {
      let itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload
      );
      state.items[itemIndex].amount += 1;
    },
    decreaseItemAmount(state, action) {
      let itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload
      );
      if (state.items[itemIndex].amount === 1) {
        return;
      } else {
        state.items[itemIndex].amount -= 1;
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
