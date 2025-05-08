import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, total } = useSelector((state) => state.cart);

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    if (items.length === 0) {
        return (
            <section className="cart-container">
                <h2>Your Cart</h2>
                <p>Your cart is empty</p>
                <Link to="/products">
                    <button>Continue Shopping</button>
                </Link>
            </section>
        );
    }

    return (
        <section className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img 
                            src={item.img_url} 
                            alt={item.name} 
                            className="cart-item-image"
                        />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <div className="quantity-controls">
                                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${item.id}`}
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                />
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
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </section>
    );
};

export default Cart; 