import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchCartQuery, useClearCartMutation } from "../../api/API";
import "./checkout.css";

const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: cartItems, isLoading, error } = useFetchCartQuery(user?.id, {
    skip: !user?.id, // Skip the query if there's no user ID
  });
  const [hasCheckedOut, setHasCheckedOut] = useState(false);

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const [clearCart] = useClearCartMutation();
  const handlePurchase = () => {
    clearCart(user?.id);
    setHasCheckedOut(true);
  };

  if (!hasCheckedOut && cartItems) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="cart-items-grid">
          <div className="grid-header">
            <div>Item Name</div>
            <div>Quantity</div>
            <div>Price</div>
          </div>

          {cartItems?.map((item) => (
            <div key={item.id} className="grid-row">
              <div>{item.name}</div>
              <div>{item.quantity}</div>
              <div>${item.price}</div>
            </div>
          ))}
        </div>

        <div className="total-section">
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
        </div>

        <div className="shipping-section">
          <h3>Shipping Address</h3>
          <div className="shipping-details">
            <p>Name: {user?.name}</p>
            <p>Address: {user?.mailing_address}</p>
          </div>
        </div>
        <button className="purchase-button" onClick={() => handlePurchase()}>
          Purchase
        </button>
      </div>
    );
  } else {
    return (
      <div className="checkout-container">
        <h2>Thank you for your purchase!</h2>
      </div>
    );
  }
};

export default Checkout;
