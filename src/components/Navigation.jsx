import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, logout, getCart } from '../redux/userSlice';
import './Navigation.css';

function Navigation() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(getCart);
    const cartItemCount = cart ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navigation">
            <div className="nav-content">
                <div className="nav-left">
                    <Link to="/products" className="nav-link">Products</Link>
                </div>

                <div className="nav-right">
                    {token ? (
                        <>
                            <Link to="/account" className="nav-link">My Account</Link>
                            <button 
                                onClick={handleLogout}
                                className="nav-button logout-button"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-button register-button">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="nav-cart">
                    <Link to="/cart" className="cart-link">
                        <span className="cart-icon">🛒</span>
                        {cartItemCount > 0 && (
                            <span className="cart-count">{cartItemCount}</span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;