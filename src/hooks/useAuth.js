// useAuth.js
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  logout,
  //   selectUser,
  //   selectIsAuthenticated,
} from "../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/apis/auth.api";
import { handlePostRequest } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { handleSubmit, control, clearErrors } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = true;
  const [loginFN, { isLoading: loginLoading }] = useLoginMutation();
  const login = async (data) => {
    try {
      clearErrors();
      let res = await handlePostRequest(loginFN, data);
      console.log("login response", res);
      if (res.success) {
        console.log("login response", res);
        await localStorage.setItem(
          "userId",
          JSON.stringify(res?.data?.data?.user?._id)
        );

        dispatch(setUser(res?.data?.data?.user));
        navigate("/shop", { replace: true });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    handleSubmit,
    control,
    loginLoading,
    isAuthenticated,
    login,
    logout: logoutUser,
  };
};

export default useAuth;
