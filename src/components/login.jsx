import React, { useState } from 'react';
import { useLoginMutation } from '../api/API';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            const result = await login({ username, password }).unwrap();

            if (result.token) {
                localStorage.setItem('token', result.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.data?.message || 'Failed to login. Please try again.');
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
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </section>
    );
};

export default Login;
