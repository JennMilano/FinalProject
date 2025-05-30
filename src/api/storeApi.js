import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL || "https://capstone-backend-sdbp.onrender.com" }),
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },

    tagTypes: ["Products", "Users", "Cart"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["Products"],
        }),
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        getCart: builder.query({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),
    }),
});

export const { useGetProductsQuery, useGetUsersQuery, useGetCartQuery } = storeApi;

//test line 