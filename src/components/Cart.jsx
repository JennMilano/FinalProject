import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { useFetchCartQuery, useAddToCartMutation, useReduceCartQuantityMutation, useRemoveFromCartMutation } from "../api/API";

const Cart = () => {
  
  const user = useSelector((state) => state.auth.user);
  
  const { data, isLoading, isError } = useFetchCartQuery(user?.id);
  const [addToCartMutation] = useAddToCartMutation();
  const [reduceCartQuantityMutation] = useReduceCartQuantityMutation();
  const [removeFromCartMutation] = useRemoveFromCartMutation();


  const handleRemoveItem = async (id) => {
    console.log("REMOVE ITEM", id)
    await removeFromCartMutation({ user_id: user.id, product_id: id });
  };

  const handleAddToCart = async (item) => {
console.log("ADD ITEM", item.product_id)
    await addToCartMutation({ user_id: user.id, product_id: item.product_id });
  };


  const handleReduceCartQuantity = async (item) => {
    console.log("REDUCE ITEM", item.product_id)
    await reduceCartQuantityMutation({ user_id: user.id, product_id: item.product_id });
  };

  const calculateTotal = () => {
    return data?.reduce(
      (total, item) => total + item.price * (item.quantity || 0),
      0
    );
  };
console.log(data)
  if (!isLoading && data.length === 0) {
    return (
      <section className="cart-container">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <Link to="/products">
          <button className="continue-shopping-button">
            Continue Shopping
          </button>
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {data?.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.img_url}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <div className="quantity-controls">
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <div className="quantity-buttons">
                <button
                      onClick={() => handleReduceCartQuantity(item)}
                      
                      className="quantity-button-cart"
                    >
                      -
                    </button>
                </div>
                <div className="quantity-input-container">
                    {item.quantity}
                  </div>
                  <div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="quantity-button-cart"
                    >
                      +
                    </button>
                  </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.product_id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal()}</h3>
        <div className="cart-actions">
          <Link to="/products">
            <button className="continue-shopping-button">
              Continue Shopping
            </button>
          </Link>
          <Link to="/checkout">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
