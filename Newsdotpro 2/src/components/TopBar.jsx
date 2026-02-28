import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navCategories } from '../data/categories';
import './TopBar.css';

export default function TopBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Breaking News Ticker */}
            <div className="ticker-wrap">
                <span className="ticker-label">BREAKING</span>
                <div className="ticker-track">
                    <span className="ticker-text">
                        Senate passes electoral reform bill ·&nbsp;
                        Dangote refinery hits full capacity, begins West Africa exports ·&nbsp;
                        CBN holds MPR at 26.75% ·&nbsp;
                        Abuja Carnival draws record 180,000 attendees ·&nbsp;
                        Nigeria launches first sub-Saharan AI governance framework ·&nbsp;
                        FCT master plan revision unveiled: ₦680bn investment ·&nbsp;
                    </span>
                    <span className="ticker-text" aria-hidden="true">
                        Senate passes electoral reform bill ·&nbsp;
                        Dangote refinery hits full capacity, begins West Africa exports ·&nbsp;
                        CBN holds MPR at 26.75% ·&nbsp;
                        Abuja Carnival draws record 180,000 attendees ·&nbsp;
                        Nigeria launches first sub-Saharan AI governance framework ·&nbsp;
                        FCT master plan revision unveiled: ₦680bn investment ·&nbsp;
                    </span>
                </div>
            </div>

            <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
                <div className="topbar__inner container">
                    {/* Logo */}
                    <Link to="/" className="topbar__logo" aria-label="NEWSDoT Home">
                        <span className="topbar__logo-dot">NEWS</span><span className="topbar__logo-rest">DoT</span>
                    </Link>

                    {/* Nav */}
                    <nav className="topbar__nav" aria-label="Main navigation">
                        {navCategories.map(cat => (
                            <Link
                                key={cat.slug}
                                to={`/category/${cat.slug}`}
                                className="topbar__nav-link"
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="topbar__actions">
                        <button
                            className="topbar__icon-btn"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search"
                            id="search-toggle"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                        <Link to="/subscribe" className="btn btn--primary topbar__subscribe-btn">
                            Subscribe
                        </Link>
                        <Link to="/signin" className="btn btn--ghost topbar__signin-btn">
                            Sign In
                        </Link>
                        <button
                            className="topbar__hamburger"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                            id="menu-toggle"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>

                {/* Search dropdown */}
                {searchOpen && (
                    <div className="topbar__search-bar container">
                        <form onSubmit={handleSearch} className="topbar__search-form">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search NEWSDoT…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="topbar__search-input"
                                id="search-input"
                            />
                            <button type="submit" className="btn btn--primary">Search</button>
                            <button type="button" className="topbar__icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
                        </form>
                    </div>
                )}

                {/* Mobile menu */}
                {menuOpen && (
                    <nav className="topbar__mobile-nav" aria-label="Mobile navigation">
                        {navCategories.map(cat => (
                            <Link
                                key={cat.slug}
                                to={`/category/${cat.slug}`}
                                className="topbar__mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {cat.label}
                            </Link>
                        ))}
                        <div className="topbar__mobile-actions">
                            <Link to="/subscribe" className="btn btn--primary" onClick={() => setMenuOpen(false)}>Subscribe</Link>
                            <Link to="/signin" className="btn btn--ghost" onClick={() => setMenuOpen(false)}>Sign In</Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
}
