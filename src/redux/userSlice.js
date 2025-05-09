import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isAdmin: false,
    cart: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.cart = action.payload.cart;
            state.token = action.payload.token;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (product) => product.id !== action.payload
            );
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.cart = [];
            state.token = null;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.cart = action.payload.cart;
            state.token = action.payload.token;
        },
    },
});

export const { 
    setUser,
    setIsLoggedIn,
    setCart,
    addToCart,
    removeFromCart,
    logout,
    login,
    setToken
} = userSlice.actions; 

// Selectors
export const selectToken = (state) => state.auth.token;
export const getUserID = (state) => state.auth.user?.id;
export const getCart = (state) => state.auth.cart;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getToken = (state) => state.auth.token;

export default userSlice.reducer; 