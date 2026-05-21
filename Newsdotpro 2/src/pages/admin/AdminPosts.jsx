import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getArticles, deleteArticle } from '../../data/articles';
import './AdminPosts.css';

const CATEGORIES = ['All','news','politics','business','tech','society','investigations','opinion'];

export default function AdminPosts() {
    const navigate = useNavigate();
    const [posts, setPosts]               = useState([]);
    const [loading, setLoading]           = useState(true);
    const [searchTerm, setSearchTerm]     = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [isDeleting, setIsDeleting]     = useState(false);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const data = await getArticles();
            setPosts(data);
        } catch (err) {
            console.error('Failed to load articles:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadPosts(); }, []);

    const filtered = posts.filter(a => {
        const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (a.author || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = filterCategory === 'All' || a.category === filterCategory;
        return matchSearch && matchCat;
    });

    const handleEdit = (post) => {
        navigate(`/admin/posts/${post.id}/edit`);
    };

    const confirmDelete = (article) => setDeleteTarget(article);

    const executeDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        try {
            await deleteArticle(deleteTarget.id);
            setPosts(prev => prev.filter(a => a.id !== deleteTarget.id));
            setDeleteSuccess(`"${deleteTarget.title.substring(0, 50)}…" was deleted.`);
            setDeleteTarget(null);
            setTimeout(() => setDeleteSuccess(''), 4000);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="admin-page">
            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal__icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </div>
                        <h3>Delete Article?</h3>
                        <p>This will permanently remove <strong>"{deleteTarget.title.substring(0, 70)}"</strong>. This action cannot be undone.</p>
                        <div className="admin-modal__actions">
                            <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>Cancel</button>
                            <button className="admin-btn admin-btn-danger" onClick={executeDelete} disabled={isDeleting}>
                                {isDeleting ? 'Deleting…' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Manage Articles</h1>
                    <p className="admin-page-subtitle">{loading ? 'Loading…' : `${posts.length} total articles`}</p>
                </div>
                <Link to="/admin/posts/new" className="admin-btn admin-btn-primary" id="create-post-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    New Article
                </Link>
            </div>

            {deleteSuccess && (
                <div className="admin-alert admin-alert-success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    {deleteSuccess}
                </div>
            )}

            {/* Toolbar */}
            <div className="admin-posts-toolbar">
                <div className="admin-search-box">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    <input
                        type="text"
                        placeholder="Search by title or author…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        id="posts-search"
                    />
                    {searchTerm && (
                        <button className="admin-search-clear" onClick={() => setSearchTerm('')}>✕</button>
                    )}
                </div>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="admin-select admin-filter-select"
                    id="posts-filter"
                >
                    {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c === 'All' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="admin-table-container">
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: 'spin 1s linear infinite' }}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        <p style={{ marginTop: '0.75rem' }}>Loading articles from Firestore…</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Cover</th>
                                <th>Title &amp; Author</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map(post => (
                                    <tr key={post.id}>
                                        <td className="admin-td-thumb">
                                            <img
                                                src={post.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&q=60'}
                                                alt={post.title}
                                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=120&q=60'; }}
                                            />
                                        </td>
                                        <td className="admin-td-title">
                                            <Link to={`/article/${post.id}`} target="_blank" rel="noopener noreferrer" title={post.title}>
                                                {post.title}
                                            </Link>
                                            <span className="admin-post-author">by {post.author}</span>
                                        </td>
                                        <td>
                                            <span className={`admin-badge-cat admin-category-${post.category}`}>
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="admin-td-date">{post.date}</td>
                                        <td>
                                            <span className={`admin-status-pill ${post.status === 'draft' ? 'draft' : 'published'}`}>
                                                {post.status === 'draft' ? '○ Draft' : '● Published'}
                                            </span>
                                        </td>
                                        <td className="admin-td-actions">
                                            <button
                                                className="admin-action-btn view"
                                                title="View on site"
                                                onClick={() => window.open(`/article/${post.id}`, '_blank')}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                            </button>
                                            <button
                                                className="admin-action-btn edit"
                                                title="Edit article"
                                                onClick={() => handleEdit(post)}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                            </button>
                                            <button
                                                className="admin-action-btn delete"
                                                title="Delete article"
                                                onClick={() => confirmDelete(post)}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="admin-no-results">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                                        <p>No articles match your search.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
