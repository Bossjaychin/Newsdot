import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import './LatestGrid.css';

export default function LatestGrid({ articles }) {
    return (
        <section className="latest section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-header__title">Latest Stories</h2>
                    <Link to="/category/news" className="section-header__link">
                        View all
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Top Row: 2 featured cards */}
                <div className="latest__featured grid-2">
                    {articles.slice(0, 2).map(a => (
                        <ArticleCard key={a.id} article={a} size="lg" />
                    ))}
                </div>

                {/* Main Grid: 6 regular cards */}
                <div className="latest__grid grid-3" style={{ marginTop: 'var(--space-6)' }}>
                    {articles.slice(2, 8).map(a => (
                        <ArticleCard key={a.id} article={a} size="md" />
                    ))}
                </div>

                {/* Tag filter bar */}
                <div className="latest__tags">
                    {['All', 'Abuja', 'Nigeria', 'Africa', 'Global'].map(tag => (
                        <button key={tag} className={`latest__tag-btn ${tag === 'All' ? 'latest__tag-btn--active' : ''}`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
