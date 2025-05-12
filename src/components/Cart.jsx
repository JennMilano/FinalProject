import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { useFetchCartQuery } from '../api/API';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const { data, isLoading, isError } = useFetchCartQuery();
    console.log(data)

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    if (!cart || cart.length === 0) {
        return (
            <section className="cart-container">
                <h2>Your Cart</h2>
                <p>Your cart is empty</p>
                <Link to="/products">
                    <button className="continue-shopping-button">Continue Shopping</button>
                </Link>
            </section>
        );
    }

    return (
        <section className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cart.map((item) => (
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
                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        id={`quantity-${item.id}`}
                                        min="1"
                                        value={item.quantity || 1}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="quantity-input"
                                    />
                                    <button 
                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                        className="quantity-button"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="remove-button"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                <div className="cart-actions">
                    <Link to="/products">
                        <button className="continue-shopping-button">Continue Shopping</button>
                    </Link>
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            </div>
        </section>
    );
};

export default Cart;