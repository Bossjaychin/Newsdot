import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <Link to="/" className="admin-logo">
                        NEWS<strong>DoT</strong> <span className="admin-badge">Admin</span>
                    </Link>
                </div>

                <nav className="admin-nav">
                    <Link
                        to="/admin"
                        className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`}
                    >
                        <i className="ri-dashboard-line"></i> Dashboard
                    </Link>
                    <Link
                        to="/admin/posts"
                        className={`admin-nav-item ${location.pathname.startsWith('/admin/posts') ? 'active' : ''}`}
                    >
                        <i className="ri-article-line"></i> Manage Posts
                    </Link>
                    <Link
                        to="/"
                        className="admin-nav-item"
                        target="_blank"
                    >
                        <i className="ri-external-link-line"></i> View Site
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user-info">
                        <div className="admin-avatar">
                            {user?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="admin-user-details">
                            <span className="admin-username">{user?.username}</span>
                            <span className="admin-role">{user?.role}</span>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="admin-header-left">
                        {/* Mobile menu toggle could go here */}
                    </div>
                    <div className="admin-header-right">
                        <button onClick={handleLogout} className="admin-logout-btn">
                            <i className="ri-logout-box-r-line"></i> Logout
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
