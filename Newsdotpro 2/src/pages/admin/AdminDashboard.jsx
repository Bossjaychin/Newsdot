import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getArticles } from '../../data/articles';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        getArticles()
            .then(data => { setArticles(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });
    }, []);

    const totalPosts  = articles.length;
    const recentPosts = articles.slice(0, 6);
    const firstName   = user?.name?.split(' ')[0] || user?.username?.split('@')[0] || 'Editor';

    const stats = [
        {
            label: 'Total Articles',
            value: loading ? '…' : totalPosts,
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M16 2v20"/><path d="M8 7h4"/><path d="M8 11h4"/><path d="M8 15h4"/></svg>),
            color: '#1b6b3a', bg: 'rgba(27,107,58,0.1)', change: 'Live from Firestore', positive: true,
        },
        {
            label: 'Total Page Views',
            value: '48,320',
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>),
            color: '#2563eb', bg: 'rgba(37,99,235,0.1)', change: '+12% vs last month', positive: true,
        },
        {
            label: 'Newsletter Subscribers',
            value: '12,450',
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
            color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', change: '+248 this month', positive: true,
        },
        {
            label: 'Avg. Read Time',
            value: '4 min',
            icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
            color: '#d97706', bg: 'rgba(217,119,6,0.1)', change: 'Good engagement', positive: true,
        },
    ];

    const quickActions = [
        { label: 'New Article',   to: '/admin/posts/new', icon: '✏️', desc: 'Write & publish' },
        { label: 'Manage Posts',  to: '/admin/posts',     icon: '📋', desc: 'Edit existing' },
        { label: 'View Site',     to: '/',                icon: '🌐', desc: 'Public homepage' },
        { label: 'Contact Info',  to: '/contact',         icon: '📞', desc: 'info@newsdot.blog' },
    ];

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Welcome back, {firstName} 👋</h1>
                    <p className="admin-page-subtitle">
                        {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <Link to="/admin/posts/new" className="admin-btn admin-btn-primary" id="new-post-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Article
                </Link>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
                {stats.map((s) => (
                    <div className="admin-stat-card" key={s.label}>
                        <div className="admin-stat-icon" style={{ backgroundColor: s.bg, color: s.color }}>{s.icon}</div>
                        <div className="admin-stat-details">
                            <h3>{s.label}</h3>
                            <p className="admin-stat-value">{s.value}</p>
                            <span className={`admin-stat-change ${s.positive ? 'positive' : 'negative'}`}>
                                {s.positive ? '↑' : '↓'} {s.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="admin-quick-actions">
                <h2 className="admin-section-heading">Quick Actions</h2>
                <div className="admin-quick-grid">
                    {quickActions.map((a) => (
                        <Link key={a.label} to={a.to} className="admin-quick-card">
                            <span className="admin-quick-card__icon">{a.icon}</span>
                            <div><strong>{a.label}</strong><span>{a.desc}</span></div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Articles */}
            <div className="admin-recent-section">
                <div className="admin-section-header">
                    <h2 className="admin-section-heading">Recent Articles</h2>
                    <Link to="/admin/posts" className="admin-link">View All →</Link>
                </div>

                <div className="admin-table-container">
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading…</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Status</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPosts.map(post => (
                                    <tr key={post.id}>
                                        <td className="admin-td-title">
                                            <Link to={`/article/${post.id}`} target="_blank" rel="noopener noreferrer">{post.title}</Link>
                                        </td>
                                        <td><span className={`admin-badge-cat admin-category-${post.category}`}>{post.category}</span></td>
                                        <td className="admin-td-author">{post.author}</td>
                                        <td className="admin-td-date">{post.date}</td>
                                        <td><span className="admin-status-published">● Published</span></td>
                                        <td>
                                            <div className="admin-row-actions">
                                                <Link to={`/article/${post.id}`} target="_blank" className="admin-action-btn" title="View">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                </Link>
                                                <Link to={`/admin/posts/${post.id}/edit`} className="admin-action-btn" title="Edit">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
