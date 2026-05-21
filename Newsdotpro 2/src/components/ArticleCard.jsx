import { Link } from 'react-router-dom';
import './ArticleCard.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=900&q=80';

export default function ArticleCard({ article, size = 'md' }) {
    if (!article) return null;
    const chipClass = `chip chip--${article.tagSlug}`;

    return (
        <article className={`card article-card article-card--${size}`}>
            <Link to={`/article/${article.id}`} className="card__image-wrap">
                <img
                    src={article.image || FALLBACK_IMG}
                    alt={article.title}
                    loading="lazy"
                    onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                />
                <span className={`${chipClass} card__image-tag`}>{article.tag}</span>
            </Link>
            <div className="card__body">
                <div className="card__meta">
                    <span className={`chip chip--${article.category}`}>{article.category}</span>
                    <span className="card__time">{article.date}</span>
                    {article.verified && <span className="verified-badge">✓ Verified</span>}
                </div>
                <Link to={`/article/${article.id}`}>
                    <h2 className="headline-sm card__headline">{article.title}</h2>
                </Link>
                <p className="card__excerpt">{article.excerpt}</p>
                <div className="card__footer">
                    <span className="card__author-name">{article.author}</span>
                    <span className="card__readtime">{article.readTime}</span>
                </div>
                <Link to={`/article/${article.id}`} className="card__read-more">
                    Read story
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}
