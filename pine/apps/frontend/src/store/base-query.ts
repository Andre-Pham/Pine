import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./index";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3003",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const token = (api.getState() as RootState).auth.token;
  if (!token) {
    return {
      error: { status: 401, data: "No auth token" },
    };
  }
  return baseQuery(args, api, extraOptions);
};
