import { useParams, Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import NewsletterCTA from '../components/NewsletterCTA';
import { articles } from '../data/articles';
import { categories } from '../data/categories';
import './CategoryPage.css';

export default function CategoryPage() {
    const { slug } = useParams();
    const categoryInfo = categories.find(c => c.slug === slug);
    const filtered = articles.filter(a => a.category === slug);
    const label = categoryInfo?.label || slug?.charAt(0).toUpperCase() + slug?.slice(1);

    return (
        <>
            <TopBar />
            <main>
                <section className="category-hero">
                    <div className="container">
                        <div className="category-hero__inner">
                            <div>
                                <span className={`chip chip--${slug} category-hero__chip`}>{label}</span>
                                <h1 className="headline-xl category-hero__title">{label}</h1>
                                <p className="body-lg category-hero__desc">
                                    {categoryInfo?.description || `Verified, in-depth ${label} coverage from NEWSDoT.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        {filtered.length === 0 ? (
                            <div className="category-empty">
                                <p className="headline-md">No stories yet in {label}.</p>
                                <p className="body-md" style={{ marginTop: '12px', color: 'var(--color-text-secondary)' }}>
                                    Check back soon — our journalists are on it.
                                </p>
                                <Link to="/" className="btn btn--primary" style={{ marginTop: '24px' }}>Back to Homepage</Link>
                            </div>
                        ) : (
                            <>
                                {/* Featured top story */}
                                <div className="category-page__featured">
                                    <ArticleCard article={filtered[0]} size="lg" />
                                </div>
                                {/* Grid */}
                                {filtered.length > 1 && (
                                    <div className="grid-3 category-page__grid">
                                        {filtered.slice(1).map(a => (
                                            <ArticleCard key={a.id} article={a} />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <NewsletterCTA />
            </main>
            <Footer />
        </>
    );
}
