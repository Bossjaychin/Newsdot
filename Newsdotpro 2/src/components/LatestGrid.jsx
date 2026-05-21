import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import './LatestGrid.css';

const FILTER_TAGS = ['All', 'Abuja', 'Nigeria', 'Africa', 'Global'];

export default function LatestGrid({ articles }) {
    const [activeTag, setActiveTag] = useState('All');

    const filtered = activeTag === 'All'
        ? articles
        : articles.filter(a =>
            (a.tag || '').toLowerCase() === activeTag.toLowerCase() ||
            (a.category || '').toLowerCase() === activeTag.toLowerCase()
        );

    return (
        <section className="latest section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-header__title">Latest Stories</h2>
                    <Link to="/category/news" className="section-header__link">
                        View all →
                    </Link>
                </div>

                {/* Filter pills — above the grid (matches screenshot) */}
                <div className="latest__filter-bar">
                    {FILTER_TAGS.map(tag => (
                        <button
                            key={tag}
                            className={`latest__tag-btn ${activeTag === tag ? 'latest__tag-btn--active' : ''}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="latest__empty">No stories found in this category.</div>
                ) : (
                    <>
                        {/* Top Row: 2 featured cards */}
                        <div className="latest__featured grid-2">
                            {filtered.slice(0, 2).map(a => (
                                <ArticleCard key={a.id} article={a} size="lg" />
                            ))}
                        </div>

                        {/* Main Grid: remaining cards */}
                        {filtered.length > 2 && (
                            <div className="latest__grid grid-3" style={{ marginTop: 'var(--space-6)' }}>
                                {filtered.slice(2, 8).map(a => (
                                    <ArticleCard key={a.id} article={a} size="md" />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
