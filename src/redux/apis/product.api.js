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
  }),
});

export const { useGetProductsQuery } = product;
