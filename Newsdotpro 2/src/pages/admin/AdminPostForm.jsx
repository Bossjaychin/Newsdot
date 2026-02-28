import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addArticle } from '../../data/articles';
import { useAuth } from '../../context/AuthContext';
import './AdminPostForm.css';

export default function AdminPostForm() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('news');
    const [excerpt, setExcerpt] = useState('');
    const [body, setBody] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!title || !category || !excerpt || !body) {
                throw new Error("Please fill in all required fields.");
            }

            // Build article object
            const newArticle = {
                title,
                category,
                excerpt,
                body,
                author: user?.username || 'Admin User',
                image: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=900&q=80',
                readTime: `${Math.ceil(body.split(' ').length / 200)} min read`
            };

            addArticle(newArticle);

            // Navigate back to posts list
            navigate('/admin/posts');
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <div className="admin-header-left">
                    <Link to="/admin/posts" className="admin-back-link">
                        <i className="ri-arrow-left-line"></i> Back to Posts
                    </Link>
                    <h1 className="admin-page-title">Create New Post</h1>
                </div>
            </div>

            <div className="admin-form-container">
                {error && <div className="admin-alert admin-alert-error">{error}</div>}

                <form className="admin-post-form" onSubmit={handleSubmit}>
                    <div className="admin-form-row">
                        <div className="admin-form-group main-col">
                            <label htmlFor="title">Article Title *</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a compelling headline"
                                required
                            />
                        </div>

                        <div className="admin-form-group side-col">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="admin-select"
                                required
                            >
                                <option value="news">General News</option>
                                <option value="politics">Politics</option>
                                <option value="business">Business</option>
                                <option value="tech">Technology</option>
                                <option value="society">Society</option>
                                <option value="investigations">Investigations</option>
                                <option value="opinion">Opinion</option>
                            </select>
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="excerpt">Excerpt (Short Description) *</label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows="2"
                            placeholder="A brief summary of the article..."
                            required
                        ></textarea>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="imageUrl">Cover Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                        />
                        <small>Provide a valid URL. Leave blank to use a default image.</small>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="body">Article Body *</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows="15"
                            placeholder="Write the full article content here..."
                            required
                        ></textarea>
                    </div>

                    <div className="admin-form-actions">
                        <Link to="/admin/posts" className="admin-btn admin-btn-secondary">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="admin-btn admin-btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Article'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
