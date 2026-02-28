import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/admin');
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);

        if (success) {
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        } else {
            setError('Invalid credentials. Use any username and password "admin123"');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <Link to="/" className="admin-login-logo">
                        NEWS<strong>DoT</strong>
                    </Link>
                    <p>Admin Portal Access</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    {error && <div className="admin-alert admin-alert-error">{error}</div>}

                    <div className="admin-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter any username"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Hint: admin123"
                            required
                        />
                    </div>

                    <button type="submit" className="admin-login-btn">
                        Sign In
                    </button>
                </form>

                <div className="admin-login-footer">
                    <Link to="/">&larr; Back to Main Site</Link>
                </div>
            </div>
        </div>
    );
}
