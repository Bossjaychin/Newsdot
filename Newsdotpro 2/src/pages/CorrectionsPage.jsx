import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './StaticPages.css';

export default function CorrectionsPage() {
    return (
        <div className="static-page">
            <TopBar />
            <main className="static-page__main">
                <section className="static-hero">
                    <div className="container static-hero__inner">
                        <span className="static-hero__eyebrow">Transparency</span>
                        <h1 className="static-hero__title">Corrections</h1>
                        <div className="static-hero__meta">
                            <span className="static-hero__meta-item">📅 Last Updated: May 2025</span>
                        </div>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container static-content__inner">
                        <div className="static-callout">
                            <p><strong>Our Commitment:</strong> NEWSDoT is committed to correcting any error quickly, prominently, and transparently. Accuracy is at the core of our journalism — and when we fall short, we own it.</p>
                        </div>

                        <h2 id="how-we-handle">How We Handle Errors</h2>
                        <p>When a factual error is identified in any of our published content, we will:</p>
                        <ul>
                            <li><strong>Act quickly</strong> — Errors are corrected as soon as they are verified, regardless of how much time has passed since publication.</li>
                            <li><strong>Be transparent</strong> — We clearly label corrected articles with a correction notice at the top, describing what was wrong and what the correct information is.</li>
                            <li><strong>Not erase history</strong> — We never silently delete or rewrite articles. All corrections include the original error and the correction, so readers can understand what changed.</li>
                            <li><strong>Update social media</strong> — Where a story with an error was shared on our social channels, we will post a correction update.</li>
                        </ul>

                        <h2 id="types-of-corrections">Types of Corrections</h2>
                        <h3>Factual Corrections</h3>
                        <p>When verified facts in a story are found to be wrong — such as names, dates, statistics, or events — a correction notice is added to the article clearly stating the original error and the correct information.</p>
                        <h3>Clarifications</h3>
                        <p>When a story has not stated something incorrectly but may have given a misleading impression, we add a clarification to ensure the full picture is understood.</p>
                        <h3>Updates</h3>
                        <p>When a story is updated with new developments, we add an "Updated" timestamp and note what information was added. This is distinct from a correction.</p>
                        <h3>Retractions</h3>
                        <p>In rare cases where a story is found to be fundamentally inaccurate or published in error, it will be retracted. The article will be replaced with a retraction notice explaining why the article has been withdrawn.</p>

                        <h2 id="report-an-error">Report an Error</h2>
                        <p>If you believe there is an error in any of our published content, please let us know immediately. We welcome corrections from our readers.</p>
                        <div className="static-contact-box">
                            <div className="static-contact-box__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </div>
                            <div className="static-contact-box__text">
                                <h4>Report a Correction</h4>
                                <p>Email <a href="mailto:info@newsdot.blog">info@newsdot.blog</a> with the subject line "Correction Request" — include the article URL and the specific error you have identified. You can also reach us at <a href="tel:08068460748">08068460748</a>.</p>
                            </div>
                        </div>

                        <h2 id="response-time">Response Times</h2>
                        <p>We aim to acknowledge all correction requests within <strong>24 hours</strong>. Verified factual errors are corrected within <strong>24–48 hours</strong> of confirmation. Complex corrections that require further editorial review may take up to <strong>5 working days</strong>.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
