import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) navigate('/admin');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Brief delay for UX
        await new Promise(r => setTimeout(r, 600));

        const result = await login(username, password);
        setLoading(false);

        if (result.success) {
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        } else {
            setError(result.error || 'Invalid email or password. Please check your credentials and try again.');
        }
    };

    return (
        <div className="admin-login-page">
            {/* Left panel — branding */}
            <div className="admin-login-panel admin-login-panel--left">
                <div className="admin-login-panel__inner">
                    <Link to="/" className="admin-login-brand">
                        <span className="admin-login-brand__news">NEWS</span>
                        <span className="admin-login-brand__dot">DoT</span>
                    </Link>
                    <p className="admin-login-brand__tagline">Your Daily Dot of Truth</p>
                    <div className="admin-login-features">
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">📰</span>
                            <span>Publish &amp; manage articles</span>
                        </div>
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">📊</span>
                            <span>Monitor site analytics</span>
                        </div>
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">🔒</span>
                            <span>Secure editorial access</span>
                        </div>
                    </div>
                    <div className="admin-login-panel__footer">
                        &copy; {new Date().getFullYear()} NEWSDoT Media · Abuja, Nigeria
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="admin-login-panel admin-login-panel--right">
                <div className="admin-login-card">
                    <div className="admin-login-card__header">
                        <h1>Admin Portal</h1>
                        <p>Sign in to access your editorial dashboard</p>
                    </div>

                    <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="admin-alert admin-alert-error" role="alert">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                {error}
                            </div>
                        )}

                        <div className="admin-form-group">
                            <label htmlFor="admin-email">Email Address</label>
                            <div className="admin-input-wrap">
                                <svg className="admin-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                <input
                                    type="email"
                                    id="admin-email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="info@newsdot.blog"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label htmlFor="admin-password">Password</label>
                            <div className="admin-input-wrap">
                                <svg className="admin-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="admin-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="admin-password-toggle"
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="admin-forgot-link">
                            <Link to="/admin/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" className="admin-login-btn" disabled={loading} id="admin-signin-btn">
                            {loading ? (
                                <span className="admin-login-spinner" />
                            ) : (
                                <>
                                    Sign In
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="admin-login-footer">
                        <Link to="/">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back to Main Site
                        </Link>
                        <span>·</span>
                        <a href="mailto:info@newsdot.blog">Need help?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
