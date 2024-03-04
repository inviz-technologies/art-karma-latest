import { combineReducers } from "redux";
import { userAuth } from "../apis/auth.api";

import authSlice from "./auth/authSlice";
import pathSlice from "./path/pathSlice";
export default combineReducers({
  [userAuth.reducerPath]: userAuth.reducer,
  authSlice,
  pathSlice,
});
