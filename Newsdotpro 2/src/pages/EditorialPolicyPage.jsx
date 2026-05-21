import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './StaticPages.css';

export default function EditorialPolicyPage() {
    return (
        <div className="static-page">
            <TopBar />
            <main className="static-page__main">
                <section className="static-hero">
                    <div className="container static-hero__inner">
                        <span className="static-hero__eyebrow">Standards & Ethics</span>
                        <h1 className="static-hero__title">Editorial Policy</h1>
                        <div className="static-hero__meta">
                            <span className="static-hero__meta-item">📅 Last Updated: May 2025</span>
                        </div>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container static-content__inner">
                        <div className="updated-badge">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14H11V11h2v5zm0-8H11V6h2v2z"/></svg>
                            Effective: May 2025 | Review: Annually
                        </div>

                        <nav className="static-toc">
                            <p className="static-toc__title">On This Page</p>
                            <ul className="static-toc__list">
                                <li><a href="#our-commitment">Our Commitment to Truth</a></li>
                                <li><a href="#accuracy">Accuracy & Verification</a></li>
                                <li><a href="#independence">Editorial Independence</a></li>
                                <li><a href="#fairness">Fairness & Impartiality</a></li>
                                <li><a href="#sources">Sources & Confidentiality</a></li>
                                <li><a href="#conflicts">Conflicts of Interest</a></li>
                                <li><a href="#corrections-policy">Corrections Policy</a></li>
                                <li><a href="#complaints">Complaints</a></li>
                            </ul>
                        </nav>

                        <h2 id="our-commitment">Our Commitment to Truth</h2>
                        <p>NEWSDoT is committed to publishing journalism of the highest standard. We believe that truth, accuracy, and transparency are not optional extras — they are the foundation of our work. Every story published on this platform has passed through an editorial review process designed to uphold these values.</p>

                        <h2 id="accuracy">Accuracy & Verification</h2>
                        <p>We verify every material fact before publication. Our reporters are required to:</p>
                        <ul>
                            <li>Corroborate claims with at least two independent, credible sources.</li>
                            <li>Seek comment or response from any person or organisation being reported on before publication.</li>
                            <li>Use primary source documents wherever possible — court records, official statements, financial filings, and government data.</li>
                            <li>Clearly distinguish between verified facts and allegations or claims under dispute.</li>
                        </ul>
                        <div className="static-callout">
                            <p><strong>Our Standard:</strong> If we cannot verify it, we do not publish it. If we publish something later found to be inaccurate, we correct the record immediately and transparently.</p>
                        </div>

                        <h2 id="independence">Editorial Independence</h2>
                        <p>NEWSDoT's editorial decisions are made by our editors and journalists — not by advertisers, investors, government officials, or any external party. Our editorial independence is non-negotiable.</p>
                        <p>Commercial relationships, including advertising and sponsorships, have zero influence on our editorial coverage. Sponsored content is always clearly labelled as such and is produced separately from the newsroom.</p>

                        <h2 id="fairness">Fairness & Impartiality</h2>
                        <p>We strive to present a fair and balanced account of events, representing all sides of a story where relevant. On contested issues, we will include diverse perspectives and provide the audience with sufficient context to form their own judgement.</p>
                        <p>Opinion and commentary are clearly distinguished from news reporting. Columns and op-eds represent the views of individual contributors, not of NEWSDoT as an institution.</p>

                        <h2 id="sources">Sources & Confidentiality</h2>
                        <p>We protect the identity of confidential sources where disclosure would put them at risk. Before granting anonymity, our editors must agree that:</p>
                        <ul>
                            <li>The information is materially important to the public interest.</li>
                            <li>The source would face real harm if identified.</li>
                            <li>The information cannot be obtained any other way.</li>
                        </ul>
                        <p>We do not use anonymous sources to publish claims that damage the reputation of individuals or organisations unless we have compelling corroborating evidence.</p>

                        <h2 id="conflicts">Conflicts of Interest</h2>
                        <p>All editorial staff are required to disclose any personal, financial, or professional interest that could affect — or appear to affect — their coverage. Journalists do not report on subjects in which they have a direct interest.</p>

                        <h2 id="corrections-policy">Corrections Policy</h2>
                        <p>We take errors seriously. When we make a factual mistake, we will correct it promptly, prominently, and transparently. Please see our full <a href="/corrections">Corrections Policy</a> for details.</p>

                        <h2 id="complaints">Complaints</h2>
                        <div className="static-contact-box">
                            <div className="static-contact-box__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </div>
                            <div className="static-contact-box__text">
                                <h4>Editorial Complaints</h4>
                                <p>If you believe we have breached our editorial standards, please contact us at <a href="mailto:info@newsdot.blog">info@newsdot.blog</a> or call <a href="tel:08068460748">08068460748</a>. We take all complaints seriously and will respond within 5 working days.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
