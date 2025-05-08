import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { logout } from '../redux/authSlice';
import './Navigation.css';

function Navigation() {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navigation">
            <div className="nav-content">
                <div className="nav-left">
                    <Link to="/" className="nav-link">Home</Link>
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
            </div>
        </nav>
    );
}

export default Navigation;