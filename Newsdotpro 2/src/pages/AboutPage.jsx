import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './StaticPages.css';

export default function AboutPage() {
    return (
        <div className="static-page">
            <TopBar />
            <main className="static-page__main">
                {/* Hero */}
                <section className="static-hero">
                    <div className="container static-hero__inner">
                        <span className="static-hero__eyebrow">About NEWSDoT</span>
                        <h1 className="static-hero__title">Journalism built on truth,<br />driven by purpose.</h1>
                        <div className="static-hero__meta">
                            <span className="static-hero__meta-item">📍 Abuja, FCT, Nigeria</span>
                            <span className="static-hero__meta-item">📞 08068460748</span>
                            <span className="static-hero__meta-item">✉ info@newsdot.blog</span>
                        </div>
                    </div>
                </section>

                {/* Body */}
                <section className="static-content">
                    <div className="container static-content__inner">

                        <div className="static-callout">
                            <p><strong>Our Tagline:</strong> Your Daily Dot of Truth in a Fast-Moving World.</p>
                        </div>

                        <h2 id="who-we-are">Who We Are</h2>
                        <p>NEWSDoT is a digital-first news platform headquartered in Abuja, Nigeria's Federal Capital Territory. We are committed to delivering accurate, in-depth, and independently verified journalism that serves the public interest — from the streets of Wuse and Maitama to the global stage.</p>
                        <p>We cover breaking news, politics, business, technology, society, and investigative reporting with a clear editorial compass: the truth comes first, every time.</p>

                        <h2 id="our-mission">Our Mission</h2>
                        <p>Our mission is simple: to give Nigerians and the world a reliable, context-rich, and responsible source of news. In an era of misinformation and clickbait, NEWSDoT stands as a platform where every published story has been verified, every source checked, and every fact confirmed before it reaches you.</p>
                        <p>We believe that quality journalism is a public service — and we take that responsibility seriously.</p>

                        <h2 id="what-we-cover">What We Cover</h2>
                        <ul>
                            <li><strong>News & Politics:</strong> Government decisions, elections, legislation, and accountability reporting from Abuja and beyond.</li>
                            <li><strong>Business & Economy:</strong> Market trends, startup stories, CBN policy, and Nigeria's financial landscape.</li>
                            <li><strong>Technology:</strong> Innovation, AI, telecom, and the growing digital economy across Africa.</li>
                            <li><strong>Society & Culture:</strong> Health, education, lifestyle, and the stories of everyday Nigerians.</li>
                            <li><strong>Investigations:</strong> Deep-dive accountability journalism backed by verified sources and documented evidence.</li>
                            <li><strong>Abuja Brief:</strong> Our daily roundup from the FCT — policy, transport, security, and local events.</li>
                        </ul>

                        <h2 id="our-values">Our Values</h2>
                        <h3>Truth First</h3>
                        <p>We never publish a story we cannot stand behind. Our reporters are trained to verify facts from multiple independent sources before any story goes live.</p>
                        <h3>Independence</h3>
                        <p>NEWSDoT operates independently. We do not take editorial direction from governments, advertisers, or political parties. Our newsroom decisions are made by our editorial team alone.</p>
                        <h3>Context Matters</h3>
                        <p>We believe news without context is noise. Every story we publish includes the background, significance, and implications to help readers understand not just what happened — but why it matters.</p>
                        <h3>Accountability</h3>
                        <p>We hold the powerful to account. Whether it's government, corporations, or public institutions, NEWSDoT's investigative desk exists to shine a light on wrongdoing, waste, and corruption.</p>

                        <h2 id="contact-us">Contact Us</h2>
                        <div className="static-contact-box">
                            <div className="static-contact-box__icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                            </div>
                            <div className="static-contact-box__text">
                                <h4>Reach Our Team</h4>
                                <p>📞 <a href="tel:08068460748">08068460748</a> &nbsp;|&nbsp; ✉ <a href="mailto:info@newsdot.blog">info@newsdot.blog</a><br />Abuja, Federal Capital Territory, Nigeria.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
