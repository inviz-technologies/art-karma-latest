// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
// export const selectUser = (state) => state.auth.user;
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default categorySlice.reducer;
