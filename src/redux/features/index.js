import { combineReducers } from "redux";
import { userAuth } from "../apis/auth.api";
import { category } from "../apis/category.api";
import { product } from "../apis/product.api";

import authSlice from "./auth/authSlice";
import pathSlice from "./path/pathSlice";
import categorySlice from "./categories/categorySlice";
import productSlice from "./products/productSlice";

export default combineReducers({
  [userAuth.reducerPath]: userAuth.reducer,
  [category.reducerPath]: category.reducer,
  [product.reducerPath]: product.reducer,
  authSlice,
  pathSlice,
  categorySlice,
  productSlice,
});
