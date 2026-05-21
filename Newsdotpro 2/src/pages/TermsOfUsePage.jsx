import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './StaticPages.css';

export default function TermsOfUsePage() {
    return (
        <div className="static-page">
            <TopBar />
            <main className="static-page__main">
                <section className="static-hero">
                    <div className="container static-hero__inner">
                        <span className="static-hero__eyebrow">Legal</span>
                        <h1 className="static-hero__title">Terms of Use</h1>
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
                                <li><a href="#acceptance">Acceptance of Terms</a></li>
                                <li><a href="#use-of-site">Use of the Site</a></li>
                                <li><a href="#intellectual-property">Intellectual Property</a></li>
                                <li><a href="#user-content">User Content</a></li>
                                <li><a href="#prohibited">Prohibited Conduct</a></li>
                                <li><a href="#disclaimers">Disclaimers</a></li>
                                <li><a href="#limitation">Limitation of Liability</a></li>
                                <li><a href="#changes">Changes to These Terms</a></li>
                                <li><a href="#contact-terms">Contact</a></li>
                            </ul>
                        </nav>

                        <p>Welcome to NEWSDoT. These Terms of Use govern your access to and use of our website located at <strong>newsdot.blog</strong> and any related services. By accessing or using our site, you agree to be bound by these terms.</p>

                        <h2 id="acceptance">Acceptance of Terms</h2>
                        <p>By visiting, reading, or otherwise using NEWSDoT, you agree to these Terms of Use. If you do not agree, please do not use our platform. These terms apply to all visitors, readers, subscribers, and any other users of the site.</p>

                        <h2 id="use-of-site">Use of the Site</h2>
                        <p>NEWSDoT grants you a limited, non-exclusive, non-transferable licence to access and use the site for your personal, non-commercial purposes. You may not:</p>
                        <ul>
                            <li>Reproduce, republish, or redistribute our content without prior written permission.</li>
                            <li>Use any automated tools (bots, scrapers, crawlers) to access or extract our content.</li>
                            <li>Attempt to gain unauthorised access to any part of our systems or infrastructure.</li>
                            <li>Use the site in any way that is unlawful, fraudulent, or harmful to others.</li>
                        </ul>

                        <h2 id="intellectual-property">Intellectual Property</h2>
                        <p>All content on NEWSDoT — including articles, photographs, graphics, video, audio, logos, and the NEWSDoT brand — is the exclusive property of NEWSDoT Media or its content partners and is protected by Nigerian and international copyright law.</p>
                        <p>You may share links to our articles freely. For any reproduction or republication beyond linking, you must obtain written permission from <a href="mailto:info@newsdot.blog">info@newsdot.blog</a>.</p>
                        <div className="static-callout">
                            <p><strong>Fair Use:</strong> Brief quotations for commentary, criticism, or news reporting are permitted under fair use, provided NEWSDoT is credited as the source.</p>
                        </div>

                        <h2 id="user-content">User Content</h2>
                        <p>If you submit any content to NEWSDoT — such as letters, tips, comments, or contact form messages — you grant us a non-exclusive, royalty-free licence to use, edit, publish, and distribute that content for journalistic purposes. You confirm that any content you submit does not infringe the rights of any third party.</p>

                        <h2 id="prohibited">Prohibited Conduct</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Post, share, or submit content that is defamatory, harassing, violent, or discriminatory.</li>
                            <li>Impersonate any person or entity or misrepresent your affiliation with any organisation.</li>
                            <li>Submit false tips, fabricated documents, or deliberately misleading information.</li>
                            <li>Use our contact channels to send unsolicited promotional material (spam).</li>
                            <li>Engage in any conduct that disrupts or interferes with our services.</li>
                        </ul>

                        <h2 id="disclaimers">Disclaimers</h2>
                        <p>NEWSDoT content is provided for informational purposes only. While we strive for accuracy, our content does not constitute legal, financial, medical, or professional advice. Always seek the guidance of a qualified professional for specific advice.</p>
                        <p>We make no warranties, express or implied, regarding the completeness, accuracy, reliability, or availability of the site or its content. The site is provided "as is."</p>

                        <h2 id="limitation">Limitation of Liability</h2>
                        <p>To the maximum extent permitted by applicable law, NEWSDoT Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our platform or content.</p>

                        <h2 id="changes">Changes to These Terms</h2>
                        <p>We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated effective date. Your continued use of NEWSDoT after changes are posted constitutes your acceptance of the updated terms.</p>

                        <h2 id="contact-terms">Contact</h2>
                        <div className="static-contact-box">
                            <div className="static-contact-box__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            </div>
                            <div className="static-contact-box__text">
                                <h4>Legal Enquiries</h4>
                                <p>For questions about these Terms, please contact <a href="mailto:info@newsdot.blog">info@newsdot.blog</a> or call <a href="tel:08068460748">08068460748</a>. NEWSDoT Media, Abuja, Federal Capital Territory, Nigeria.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
