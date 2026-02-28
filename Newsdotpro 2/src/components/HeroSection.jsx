import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection({ article }) {
    if (!article) return null;
    const chipClass = `chip chip--${article.tagSlug}`;

    return (
        <section className="hero section">
            <div className="container">
                <div className="hero__inner">
                    {/* Content side */}
                    <div className="hero__content animate-in">
                        <div className="hero__meta">
                            <span className={chipClass}>{article.tag}</span>
                            <span className={`chip chip--${article.category}`}>{article.category}</span>
                            {article.verified && <span className="verified-badge">Verified Sources</span>}
                        </div>
                        <h1 className="hero__headline headline-xl">{article.title}</h1>
                        <p className="hero__excerpt body-lg">{article.excerpt}</p>
                        <div className="hero__why">
                            <span className="hero__why-label label">Why it matters</span>
                            <p className="hero__why-text body-md">
                                This story touches the foundations of Nigeria's democratic process, with consequences that will resonate well beyond the current legislative term.
                            </p>
                        </div>
                        <div className="hero__footer">
                            <div className="hero__author">
                                <div className="hero__avatar">{article.author?.charAt(0)}</div>
                                <div>
                                    <p className="hero__author-name">{article.author}</p>
                                    <p className="hero__author-meta">{article.date} · {article.readTime}</p>
                                </div>
                            </div>
                            <div className="hero__actions">
                                <Link to={`/article/${article.id}`} className="btn btn--primary hero__cta">
                                    Read Story
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <a href="#" className="btn hero__download-btn">
                                    Download App
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Image side */}
                    <Link to={`/article/${article.id}`} className="hero__image-wrap">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="hero__image"
                            loading="eager"
                        />
                        <div className="hero__image-overlay" />
                        <div className="hero__image-badge">
                            <span className="label" style={{ color: '#fff', letterSpacing: '0.1em' }}>Lead Story</span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
