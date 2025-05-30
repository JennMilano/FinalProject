import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Log the API base URL
console.log('API Base URL:', import.meta.env.VITE_API_URL || "https://capstone-backend-sdbp.onrender.com");

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL || "https://capstone-backend-sdbp.onrender.com",
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    reducerPath: "api",
    tagTypes: ["Products", "Users", "Cart"],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => "/api/products",
            providesTags: ["Products"],
        }),
        fetchUsers: builder.query({
            query: () => "/api/users",
            providesTags: ["Users"],
        }),
        fetchCart: builder.query({
            query: (user_id) => `/api/user_cart/${user_id}`,
            providesTags: ["Cart"],
        }),
        fetchSingleUser: builder.query({
            query: (user_id) => `/api/users/${user_id}`,
            providesTags: ["Users"],
          }),
        fetchSingleProduct: builder.query({
            query: (product_id) => `/api/products/${product_id}`,
            providesTags: ["Products"],
        }),
        addToCart: builder.mutation({
            query: ({ user_id, product_id }) => ({
                url: `/api/user_cart/${user_id}`,
                method: "POST",
                body: { product_id },
            }),
            invalidatesTags: ["Cart"],
        }),
        createProduct: builder.mutation({
            query: (productData) => ({
              url: "/api/products",
              method: "POST",
              body: productData,
            }),
            invalidatesTags: ["Products"],
          }),

          editProduct: builder.mutation({
            query: ({ product_id, productData }) => ({
              url: `/api/products/${product_id}`,
              method: "PUT",
              body: productData,
            }),
          }),
          deleteProduct: builder.mutation({
            query: (product_id) => ({
              url: `/api/products/${product_id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Products", "Cart"],
          }),
          removeFromCart: builder.mutation({
            query: ({ user_id, product_id }) => ({
              url: `/api/user_cart/${user_id}/${product_id}`,
              method: "DELETE",
              body: { product_id },
            }),
            invalidatesTags: ["Cart"],
          }),

          reduceCartQuantity: builder.mutation({
            query: ({ user_id, product_id }) => ({
              url: `/api/user_cart/${user_id}/${product_id}`,
              method: "PUT",
            }),
            invalidatesTags: ["Cart"],
          }),

          login: builder.mutation({
            query: (credentials) => ({
              url: "/api/login",
              method: "POST",
              body: {
                username: credentials.username,
                password: credentials.password,
              },
            }),
            invalidatesTags: ["Users"],
          }),
          createUser: builder.mutation({
            query: (userData) => ({
              url: "/api/register",
              method: "POST",
              body: {
                username: userData.username,
                password: userData.password,
                name: userData.name,
                mailing_address: userData.mailing_address,
              },
            }),
            invalidatesTags: ["Users"],
          }),
          clearCart: builder.mutation({
            query: (user_id) => ({
              url: `/api/user_cart/${user_id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
          }),
    }),
});

export const {
    useFetchProductsQuery,
    useFetchUsersQuery,
    useFetchCartQuery,
    useFetchSingleUserQuery,
    useFetchSingleProductQuery,
    useAddToCartMutation,

    useEditProductMutation,
    useDeleteProductMutation,
    useRemoveFromCartMutation,
    useLoginMutation,
    useCreateUserMutation,  
    useCreateProductMutation,
    useReduceCartQuantityMutation,
    useClearCartMutation,
} = api;
