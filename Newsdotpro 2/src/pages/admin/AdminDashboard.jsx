import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';
import './AdminDashboard.css';

export default function AdminDashboard() {
    // Basic stats
    const totalPosts = articles.length;
    const totalViews = totalPosts * Math.floor(Math.random() * (5000 - 1000 + 1) + 1000); // Mock data

    // Recent posts
    const recentPosts = articles.slice(0, 5);

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard Overview</h1>
                <Link to="/admin/posts/new" className="admin-btn admin-btn-primary">
                    <i className="ri-add-line"></i> New Post
                </Link>
            </div>

            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ backgroundColor: 'rgba(27, 94, 59, 0.1)', color: 'var(--color-accent)' }}>
                        <i className="ri-article-line"></i>
                    </div>
                    <div className="admin-stat-details">
                        <h3>Total Posts</h3>
                        <p>{totalPosts}</p>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ backgroundColor: 'rgba(52, 152, 219, 0.1)', color: '#3498db' }}>
                        <i className="ri-eye-line"></i>
                    </div>
                    <div className="admin-stat-details">
                        <h3>Total Views (Est.)</h3>
                        <p>{totalViews.toLocaleString()}</p>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon" style={{ backgroundColor: 'rgba(155, 89, 182, 0.1)', color: '#9b59b6' }}>
                        <i className="ri-user-star-line"></i>
                    </div>
                    <div className="admin-stat-details">
                        <h3>Subscribers</h3>
                        <p>12,450</p>
                    </div>
                </div>
            </div>

            <div className="admin-recent-section">
                <div className="admin-section-header">
                    <h2>Recent Articles</h2>
                    <Link to="/admin/posts" className="admin-link">View All</Link>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPosts.map(post => (
                                <tr key={post.id}>
                                    <td className="admin-td-title">
                                        <strong>{post.title}</strong>
                                        <span className="admin-post-author">by {post.author}</span>
                                    </td>
                                    <td>
                                        <span className={`admin-badge-cat admin-category-${post.category}`}>
                                            {post.category}
                                        </span>
                                    </td>
                                    <td>{post.date}</td>
                                    <td>
                                        <span className="admin-status-published">Published</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
