import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './StaticPages.css';

export default function PrivacyPolicyPage() {
    return (
        <div className="static-page">
            <TopBar />
            <main className="static-page__main">
                <section className="static-hero">
                    <div className="container static-hero__inner">
                        <span className="static-hero__eyebrow">Privacy & Data</span>
                        <h1 className="static-hero__title">Privacy Policy</h1>
                        <div className="static-hero__meta">
                            <span className="static-hero__meta-item">📅 Effective: May 2025</span>
                        </div>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container static-content__inner">
                        <div className="updated-badge">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14H11V11h2v5zm0-8H11V6h2v2z"/></svg>
                            Version 1.0 — Effective May 2025
                        </div>

                        <nav className="static-toc">
                            <p className="static-toc__title">On This Page</p>
                            <ul className="static-toc__list">
                                <li><a href="#information-we-collect">Information We Collect</a></li>
                                <li><a href="#how-we-use">How We Use Your Information</a></li>
                                <li><a href="#cookies">Cookies & Tracking</a></li>
                                <li><a href="#sharing">Sharing Your Information</a></li>
                                <li><a href="#your-rights">Your Rights</a></li>
                                <li><a href="#security">Data Security</a></li>
                                <li><a href="#children">Children's Privacy</a></li>
                                <li><a href="#contact-privacy">Contact Us</a></li>
                            </ul>
                        </nav>

                        <p>NEWSDoT ("we", "our", or "us") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you use our website at <strong>newsdot.blog</strong>.</p>

                        <h2 id="information-we-collect">Information We Collect</h2>
                        <h3>Information You Provide</h3>
                        <ul>
                            <li><strong>Newsletter subscriptions:</strong> Your email address when you subscribe to our newsletter.</li>
                            <li><strong>Contact forms:</strong> Your name, email, and message when you contact us.</li>
                            <li><strong>Account registration:</strong> If you create an account, we collect your name, email, and password (encrypted).</li>
                        </ul>
                        <h3>Information Collected Automatically</h3>
                        <ul>
                            <li><strong>Usage data:</strong> Pages visited, time spent on pages, articles read, and how you navigate the site.</li>
                            <li><strong>Device data:</strong> Browser type, operating system, IP address, and device identifiers.</li>
                            <li><strong>Referral data:</strong> The website or search query that brought you to us.</li>
                        </ul>

                        <h2 id="how-we-use">How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Deliver and personalise your news experience.</li>
                            <li>Send you our newsletter (only if you subscribed).</li>
                            <li>Respond to your enquiries and support requests.</li>
                            <li>Analyse site performance and improve our journalism.</li>
                            <li>Prevent fraud and ensure the security of our platform.</li>
                        </ul>
                        <div className="static-callout">
                            <p><strong>We do not sell your personal data.</strong> We never have, and we never will. Your data is used solely to improve your experience on NEWSDoT.</p>
                        </div>

                        <h2 id="cookies">Cookies & Tracking</h2>
                        <p>We use cookies and similar technologies to operate our website and understand how visitors use it. These include:</p>
                        <ul>
                            <li><strong>Essential cookies:</strong> Necessary for the website to function (e.g., login sessions).</li>
                            <li><strong>Analytics cookies:</strong> Help us understand traffic patterns and article performance.</li>
                            <li><strong>Advertising cookies:</strong> Used to display relevant adverts. You may opt out at any time.</li>
                        </ul>
                        <p>You can control cookies through your browser settings. Disabling some cookies may affect certain features of our site.</p>

                        <h2 id="sharing">Sharing Your Information</h2>
                        <p>We may share your information with trusted third parties only in the following circumstances:</p>
                        <ul>
                            <li><strong>Service providers:</strong> Companies that help us operate our platform (e.g., email delivery, analytics).</li>
                            <li><strong>Legal requirements:</strong> When required by law, court order, or to protect our legal rights.</li>
                            <li><strong>Business transfer:</strong> In the unlikely event of a merger or acquisition, your data would be transferred to the successor entity.</li>
                        </ul>

                        <h2 id="your-rights">Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li><strong>Access</strong> the personal data we hold about you.</li>
                            <li><strong>Correct</strong> any inaccurate data we hold.</li>
                            <li><strong>Delete</strong> your data (the "right to be forgotten").</li>
                            <li><strong>Opt out</strong> of marketing emails at any time using the unsubscribe link.</li>
                            <li><strong>Lodge a complaint</strong> with the relevant data protection authority.</li>
                        </ul>

                        <h2 id="security">Data Security</h2>
                        <p>We implement industry-standard security measures including HTTPS encryption, access controls, and regular security audits to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

                        <h2 id="children">Children's Privacy</h2>
                        <p>NEWSDoT is not directed to children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>

                        <h2 id="contact-privacy">Contact Us</h2>
                        <div className="static-contact-box">
                            <div className="static-contact-box__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div className="static-contact-box__text">
                                <h4>Data Protection Enquiries</h4>
                                <p>Email <a href="mailto:info@newsdot.blog">info@newsdot.blog</a> or call <a href="tel:08068460748">08068460748</a>. We will respond to all data-related requests within 30 days.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
