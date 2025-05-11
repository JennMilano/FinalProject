import React, { useState } from 'react';
import { useCreateUserMutation } from '../api/API';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import './Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        mailing_address: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            console.log('Sending registration data:', formData);

            const result = await createUser(formData).unwrap();
            console.log('Raw registration response:', result);

            // Check if result is an object and has the expected properties
            if (result && typeof result === 'object') {
                if (result.token) {
                    // Dispatch setCredentials action to Redux
                    dispatch(setCredentials({
                        token: result.token,
                        user: result.user
                    }));
                    
                    // Navigate to products page
                    navigate('/products');
                } else if (result.user) {
                    // If we have a user but no token, try to get the token from the user object
                    const token = result.user.token;
                    if (token) {
                        dispatch(setCredentials({
                            token: token,
                            user: result.user
                        }));
                        navigate('/products');
                    } else {
                        console.error('No token found in response:', result);
                        setError('Registration failed: No token received');
                    }
                } else {
                    console.error('Unexpected response format:', result);
                    setError('Registration failed: Invalid response format');
                }
            } else {
                console.error('Invalid response:', result);
                setError('Registration failed: Invalid response from server');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.status === 'PARSING_ERROR') {
                setError('Server error: Please check your server logs');
            } else if (err.status === 500) {
                setError('Server error: Please try again later');
            } else if (err.data?.message) {
                setError(err.data.message);
            } else {
                setError('Failed to register. Please try again.');
            }
        }
    };

    if (isLoading) {
        return (
            <section className="login-container">
                <h2>Loading...</h2>
            </section>
        );
    }

    return (
        <section className="login-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailing_address">Mailing Address:</label>
                    <input
                        type="text"
                        id="mailing_address"
                        name="mailing_address"
                        value={formData.mailing_address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </section>
    );
};

export default Register; 