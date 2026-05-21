import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { getArticles } from '../data/articles';
import './SearchPage.css';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';

    const [searchVal, setSearchVal] = useState(queryParam);
    const [articles, setArticles] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    // Synchronize local search value when URL search param changes
    useEffect(() => {
        setSearchVal(queryParam);
    }, [queryParam]);

    // Fetch all articles from Firestore
    useEffect(() => {
        setLoading(true);
        getArticles()
            .then(data => {
                setArticles(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Filter articles based on search terms
    useEffect(() => {
        if (!queryParam.trim()) {
            setFiltered([]);
            return;
        }

        const keywords = queryParam.toLowerCase().trim().split(/\s+/);
        const results = articles.filter(article => {
            const titleText = (article.title || '').toLowerCase();
            const excerptText = (article.excerpt || '').toLowerCase();
            const bodyText = (article.body || '').toLowerCase();
            const categoryText = (article.category || '').toLowerCase();
            const tagText = (article.tag || '').toLowerCase();
            const authorText = (article.author || '').toLowerCase();

            // Match if every keyword appears in at least one of the fields
            return keywords.every(kw => 
                titleText.includes(kw) ||
                excerptText.includes(kw) ||
                bodyText.includes(kw) ||
                categoryText.includes(kw) ||
                tagText.includes(kw) ||
                authorText.includes(kw)
            );
        });

        setFiltered(results);
    }, [queryParam, articles]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchVal.trim()) {
            setSearchParams({ q: searchVal.trim() });
        } else {
            setSearchParams({});
        }
    };

    const handleQuickSearch = (keyword) => {
        setSearchVal(keyword);
        setSearchParams({ q: keyword });
    };

    return (
        <>
            <TopBar />
            <main className="search-page-container">
                {/* Search Hero Section */}
                <section className="search-hero">
                    <div className="container container--narrow">
                        <div className="search-hero__content animate-in">
                            <span className="search-badge">NEWSDoT ARCHIVE DETECTIVE</span>
                            <h1 className="headline-xl search-hero__title">Search the Archives</h1>
                            <p className="body-lg search-hero__subtitle">
                                Uncover verified political intelligence, economic deep dives, and investigative breakthroughs.
                            </p>

                            <form onSubmit={handleSearchSubmit} className="search-page__form">
                                <div className="search-page__input-wrapper">
                                    <svg className="search-page__input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search by keywords, author, category, or region..."
                                        value={searchVal}
                                        onChange={e => setSearchVal(e.target.value)}
                                        className="search-page__input"
                                        id="search-page-input"
                                    />
                                    {searchVal && (
                                        <button
                                            type="button"
                                            className="search-page__clear-btn"
                                            onClick={() => setSearchVal('')}
                                            aria-label="Clear search input"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                <button type="submit" className="btn btn--primary search-page__submit-btn">
                                    Search
                                </button>
                            </form>

                            {/* Quick Tags */}
                            <div className="search-quick-tags">
                                <span className="search-quick-tags__label">Trending Queries:</span>
                                <div className="search-quick-tags__list">
                                    {['Abuja', 'Senate', 'Dangote', 'Electoral Reform', 'AI Governance', 'Investigations'].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleQuickSearch(tag)}
                                            className="search-quick-tag-btn"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="section search-results-section">
                    <div className="container">
                        {loading ? (
                            <div className="search-loading">
                                <div className="spinner"></div>
                                <p className="body-md">Scanning database archives...</p>
                            </div>
                        ) : !queryParam.trim() ? (
                            <div className="search-empty-state">
                                <div className="search-empty-icon-wrap">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                    </svg>
                                </div>
                                <h3 className="headline-md">Begin Your Investigation</h3>
                                <p className="body-md text-muted">
                                    Type your query above or click a trending topic to retrieve stories from the NEWSDoT newsroom.
                                </p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="search-empty-state animate-in">
                                <div className="search-empty-icon-wrap warning">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <h3 className="headline-md">No Records Found</h3>
                                <p className="body-md text-muted">
                                    We couldn't find any articles matching "<strong>{queryParam}</strong>".
                                </p>
                                <p className="body-sm text-secondary" style={{ marginTop: '8px' }}>
                                    Try checking for spelling errors, using more general search terms, or exploring political and business categories.
                                </p>
                                <div className="search-empty-actions">
                                    <button onClick={() => setSearchParams({})} className="btn btn--ghost">Clear Search</button>
                                    <Link to="/" className="btn btn--primary">Return Home</Link>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-in">
                                <div className="search-results-meta">
                                    <h2 className="search-results-meta__title">
                                        Search Results
                                    </h2>
                                    <span className="search-results-meta__count">
                                        Found {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} matching "<strong>{queryParam}</strong>"
                                    </span>
                                </div>

                                <div className="grid-3">
                                    {filtered.map(article => (
                                        <ArticleCard key={article.id} article={article} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
