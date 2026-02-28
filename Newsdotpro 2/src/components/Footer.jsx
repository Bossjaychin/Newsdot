import { Link } from 'react-router-dom';
import { navCategories } from '../data/categories';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <span className="footer__logo-dot">NEWS</span><span className="footer__logo-rest">DoT</span>
                        </Link>
                        <p className="footer__tagline">
                            Your Daily Dot of Truth<br />in a Fast-Moving World.
                        </p>
                        <div className="footer__social">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter / X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">Sections</h3>
                        <ul className="footer__links">
                            {navCategories.map(cat => (
                                <li key={cat.slug}>
                                    <Link to={`/category/${cat.slug}`} className="footer__link">{cat.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">Company</h3>
                        <ul className="footer__links">
                            <li><Link to="/about" className="footer__link">About NEWSDoT</Link></li>
                            <li><Link to="/team" className="footer__link">The Team</Link></li>
                            <li><Link to="/advertise" className="footer__link">Advertise</Link></li>
                            <li><Link to="/careers" className="footer__link">Careers</Link></li>
                            <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Standards */}
                    <div className="footer__col">
                        <h3 className="footer__col-title">Standards</h3>
                        <ul className="footer__links">
                            <li><Link to="/editorial-policy" className="footer__link">Editorial Policy</Link></li>
                            <li><Link to="/corrections" className="footer__link">Corrections</Link></li>
                            <li><Link to="/privacy" className="footer__link">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="footer__link">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} NEWSDoT Media. All rights reserved. Abuja, Federal Capital Territory, Nigeria.
                    </p>
                    <p className="footer__mission">
                        Truth comes first. Context matters. Every story deserves responsibility.
                    </p>
                </div>
            </div>
        </footer>
    );
}
