import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import mascotImg from '../assets/pose hai.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3030/auth/login-admin', {
                username: username,
                password: password
            });

            localStorage.setItem('token', response.data.token);
            navigate('/homepage');
        } catch (err) {
            setError(err.response?.data?.message || 'Username atau Password salah');
        }
    };

    return (
        <div className="login-body d-flex align-items-center justify-content-center">
            <div className="card login-container border-0 shadow-lg p-4">
                <div className="text-center mb-4">
                    <img src={mascotImg} alt="Mascot" className="mb-3" style={{ width: '120px' }} />
                    <h1 className="h5 fw-bold">Selamat Datang di LogiLearn!</h1>
                </div>

                {error && <div className="alert alert-danger py-2 small">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold small">Username</label>
                        <input 
                            type="text" 
                            className="form-control bg-light border-secondary-subtle" 
                            placeholder="Masukkan Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4 text-start">
                        <label className="form-label fw-semibold small">Kata Sandi</label>
                        <input 
                            type="password" 
                            className="form-control bg-light border-secondary-subtle" 
                            placeholder="Masukkan Kata Sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold rounded-pill py-2">
                        LANJUTKAN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;