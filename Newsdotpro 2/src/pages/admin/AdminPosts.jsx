import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';
import './AdminPosts.css';

export default function AdminPosts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Filter logic
    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || article.category === filterCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Posts</h1>
                <Link to="/admin/posts/new" className="admin-btn admin-btn-primary">
                    <i className="ri-quill-pen-line"></i> Create Post
                </Link>
            </div>

            <div className="admin-posts-toolbar">
                <div className="admin-search-box">
                    <i className="ri-search-line"></i>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="admin-filter-box">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="admin-select"
                    >
                        <option value="All">All Categories</option>
                        <option value="Politics">Politics</option>
                        <option value="Business">Business</option>
                        <option value="Tech">Tech</option>
                        <option value="Society">Society</option>
                        <option value="Investigations">Investigations</option>
                        <option value="Opinion">Opinion</option>
                    </select>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title & Author</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Reads (Est)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map(post => (
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
                                    <td>{Math.floor(Math.random() * (2000 - 100 + 1) + 100)}</td>
                                    <td className="admin-td-actions">
                                        <button className="admin-icon-btn edit" title="Edit Post">
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <button className="admin-icon-btn delete" title="Delete Post">
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="admin-no-results">
                                    No posts found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
