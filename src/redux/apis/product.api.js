import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQuery";

export const product = createApi({
  reducerPath: "product",
  baseQuery: customFetchBase,
  tagTypes: ["product"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: (query) => ({
        url: `products?${query}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    GetProduct: build.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = product;
