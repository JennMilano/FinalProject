import React from "react";
import { useSelector } from "react-redux";
import {  useFetchCartQuery } from "../api/API";
import "./Checkout.css";

const Checkout = () => {
    const user = useSelector((state) => state.auth.user);
    const { data, isLoading, isError } = useFetchCartQuery(user?.id);
    return (
        <div>
            <h1>Checkout</h1>
        </div>
    )
}
export default Checkout;