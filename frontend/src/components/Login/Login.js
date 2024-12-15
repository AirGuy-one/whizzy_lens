import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        axios.post('http://whizzylens.local/auth/login/', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
        .then(response => {
            setMessage(response.data.message);
            navigate('/');
        })
        .catch(error => {
            setMessage(error.response ? error.response.data.error : 'Error');
        });
    };

    const handleLogout = () => {
        axios.post('http://whizzylens.local/auth/logout/', {}, { withCredentials: true })
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(error => {
            setMessage(error.response ? error.response.data.error : 'Error');
        });
    };

    return (
        <div className="auth-form">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <p>{message}</p>
        </div>
    );
};

export default AuthForm;
