import { useParams, Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { getById, articles } from '../data/articles';
import './ArticlePage.css';

export default function ArticlePage() {
    const { id } = useParams();
    const article = getById(id);
    const related = articles.filter(a => a.category === article?.category && a.id !== article?.id).slice(0, 3);

    if (!article) {
        return (
            <>
                <TopBar />
                <main className="article-not-found container">
                    <h1 className="headline-lg">Story not found</h1>
                    <Link to="/" className="btn btn--primary" style={{ marginTop: '24px' }}>Back to Homepage</Link>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <TopBar />
            <main>
                <article className="article-page">
                    {/* Article Header */}
                    <header className="article-page__header">
                        <div className="container--narrow">
                            <nav className="article-page__breadcrumb" aria-label="Breadcrumb">
                                <Link to="/" className="article-page__breadcrumb-link">Home</Link>
                                <span className="article-page__breadcrumb-sep">›</span>
                                <Link to={`/category/${article.category}`} className="article-page__breadcrumb-link">{article.category}</Link>
                            </nav>

                            <div className="article-page__meta">
                                <span className={`chip chip--${article.tagSlug}`}>{article.tag}</span>
                                <span className={`chip chip--${article.category}`}>{article.category}</span>
                                {article.verified && <span className="verified-badge">Verified Sources</span>}
                            </div>

                            <h1 className="headline-xl article-page__headline">{article.title}</h1>
                            <p className="body-lg article-page__excerpt">{article.excerpt}</p>

                            {/* Why it matters */}
                            <div className="article-page__why">
                                <span className="label" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>Why it matters</span>
                                <p className="body-md" style={{ color: 'var(--color-text-secondary)' }}>
                                    This story has significant implications for Nigeria's governance, economy, and everyday citizens.
                                    NEWSDoT will continue monitoring developments as they evolve.
                                </p>
                            </div>

                            {/* Byline */}
                            <div className="article-page__byline">
                                <div className="hero__avatar" style={{ flexShrink: 0 }}>{article.author?.charAt(0)}</div>
                                <div>
                                    <p className="article-page__author">{article.author}</p>
                                    <p className="hero__author-meta">{article.date} · {article.readTime}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Hero image */}
                    <div className="article-page__image-wrap">
                        <img src={article.image} alt={article.title} className="article-page__image" />
                        <p className="article-page__image-caption">Image: Illustrative — NEWSDoT Editorial</p>
                    </div>

                    {/* Body */}
                    <div className="article-page__body container--narrow">
                        {article.body ? article.body.split('\n\n').map((para, i) => (
                            <p key={i} className="article-page__para body-lg">{para}</p>
                        )) : (
                            <p className="body-lg">Full article content is being loaded…</p>
                        )}

                        {/* Verified Sources Box */}
                        {article.verified && (
                            <div className="article-page__sources">
                                <h3 className="article-page__sources-title">
                                    <span className="verified-badge">Verified Sources</span>
                                    <span style={{ marginLeft: '12px' }}>Editorial Transparency</span>
                                </h3>
                                <p className="body-sm article-page__sources-text">
                                    This article is based on official statements, verified documents, and direct interviews.
                                    NEWSDoT's editorial team has reviewed all facts and sources cited.
                                    Any corrections will be published on our Corrections page.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Related articles */}
                    {related.length > 0 && (
                        <section className="article-page__related">
                            <div className="container">
                                <div className="section-header">
                                    <h2 className="section-header__title">More in {article.category}</h2>
                                    <Link to={`/category/${article.category}`} className="section-header__link">View all</Link>
                                </div>
                                <div className="grid-3">
                                    {related.map(a => <ArticleCard key={a.id} article={a} />)}
                                </div>
                            </div>
                        </section>
                    )}
                </article>
            </main>
            <Footer />
        </>
    );
}
