import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim()) {
            setError('Please enter your email address.');
            return;
        }
        // In production this triggers an email via backend
        setSubmitted(true);
    };

    return (
        <div className="admin-login-page">
            {/* Left branding panel */}
            <div className="admin-login-panel admin-login-panel--left">
                <div className="admin-login-panel__inner">
                    <Link to="/" className="admin-login-brand">
                        <span className="admin-login-brand__news">NEWS</span>
                        <span className="admin-login-brand__dot">DoT</span>
                    </Link>
                    <p className="admin-login-brand__tagline">Your Daily Dot of Truth</p>
                    <div className="admin-login-features">
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">🔐</span>
                            <span>Secure access reset</span>
                        </div>
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">📧</span>
                            <span>Reset link via email</span>
                        </div>
                        <div className="admin-login-feature">
                            <span className="admin-login-feature__icon">🛡️</span>
                            <span>Protected editorial portal</span>
                        </div>
                    </div>
                    <div className="admin-login-panel__footer">
                        &copy; {new Date().getFullYear()} NEWSDoT Media · Abuja, Nigeria
                    </div>
                </div>
            </div>

            {/* Right form panel */}
            <div className="admin-login-panel admin-login-panel--right">
                <div className="admin-login-card">
                    {submitted ? (
                        <div className="admin-forgot-success">
                            <div className="admin-forgot-success__icon">✓</div>
                            <h2>Check your email</h2>
                            <p>
                                If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
                                Check your spam folder if you don't see it within a few minutes.
                            </p>
                            <p>
                                For immediate assistance, contact{' '}
                                <a href="mailto:info@newsdot.blog">info@newsdot.blog</a> or call{' '}
                                <a href="tel:08068460748">08068460748</a>.
                            </p>
                            <Link to="/admin/login" className="admin-login-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginTop: 8 }}>
                                Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="admin-login-card__header">
                                <h1>Forgot Password</h1>
                                <p>Enter your admin email address and we'll send you a link to reset your password.</p>
                            </div>

                            <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
                                {error && (
                                    <div className="admin-alert admin-alert-error" role="alert">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                        {error}
                                    </div>
                                )}

                                <div className="admin-form-group">
                                    <label htmlFor="forgot-email">Email Address</label>
                                    <div className="admin-input-wrap">
                                        <svg className="admin-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        <input
                                            type="email"
                                            id="forgot-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="info@newsdot.blog"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="admin-login-btn" id="forgot-submit-btn">
                                    Send Reset Link
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                                </button>
                            </form>

                            <div className="admin-login-footer">
                                <Link to="/admin/login">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                                    Back to Sign In
                                </Link>
                                <span>·</span>
                                <a href="mailto:info@newsdot.blog">Need help?</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
