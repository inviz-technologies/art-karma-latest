import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQuery";

export const userAuth = createApi({
  reducerPath: "userAuth",
  baseQuery: customFetchBase,
  tagTypes: ["UserAuth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "users/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserAuth"],
    }),
    googleLogin: build.query({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
    requestOTP: build.mutation({
      query: (body) => ({
        url: "/auth/sign-up/request-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOTP: build.mutation({
      query: (body) => ({
        url: "/auth/sign-up/verify-otp",
        method: "POST",
        body,
      }),
    }),
    // this creates the account. It is called after the user has verified the OTP
    setPassword: build.mutation({
      query: (body) => ({
        url: "/auth/sign-up/set-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserAuth"],
    }),
    requestResetPasswordOTP: build.mutation({
      query: (body) => ({
        url: "/auth/forgot-password/request-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassVerifyOTP: build.mutation({
      query: (body) => ({
        url: "/auth/forgot-password/validate-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserAuth"],
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: "/auth/forgot-password/set-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserAuth"],
    }),
    currentUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["UserAuth"],
    }),
    editUser: build.mutation({
      query: (body) => ({
        url: "/user/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserAuth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyGoogleLoginQuery,
  useRequestOTPMutation,
  useVerifyOTPMutation,
  useSetPasswordMutation,
  useRequestResetPasswordOTPMutation,
  useResetPassVerifyOTPMutation,
  useResetPasswordMutation,
  useCurrentUserQuery,
  useEditUserMutation,
} = userAuth;
