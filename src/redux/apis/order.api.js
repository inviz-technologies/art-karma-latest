import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQuery";

export const order = createApi({
  reducerPath: "order",
  baseQuery: customFetchBase,
  tagTypes: ["Order"],
  endpoints: (build) => ({
    GetOrders: build.query({
      query: (query) => ({
        url: `orders`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    GetOrder: build.query({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    AddNewOrder: build.mutation({
      query: (payload) => ({
        url: `orders`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Order"],
    }),

    UpdateOrder: build.mutation({
      query: (payload, id) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddNewOrderMutation,
  useUpdateOrderMutation,
} = order;
