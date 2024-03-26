import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./baseQuery";

export const category = createApi({
  reducerPath: "category",
  baseQuery: customFetchBase,
  tagTypes: ["category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "categories?sort=createdAt",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = category;
