import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { API_URL } from "../../../utils/constants";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().generalSlice?.accessToken;
    const tempToken = getState().generalSlice?.temporaryAccessToken;
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (tempToken) {
      console.log("temptoken", tempToken);
      headers.set("Authorization", tempToken);
    }

    return headers;
  },
});

export const customFetchBase = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Un authentication handling goes here
      } catch (error) {
        console.log(
          "ERROR IN FETCHBASE 401 HANDLER: ",
          JSON.stringify(error, null, 2)
        );
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
