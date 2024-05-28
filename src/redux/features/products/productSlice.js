// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log("action.payload", action.payload)
      state.products = [...state.products, action.payload]
    },
    removeProduct: (state, action) => {
      console.log("action.payload", action.payload)
      state.products = state.products.filter(product => product._id != action.payload)
    },
  },
});

export const { setProducts, removeProduct } = productSlice.actions;

export default productSlice.reducer;
