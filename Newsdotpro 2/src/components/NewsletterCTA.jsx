import { useState } from 'react';
import './NewsletterCTA.css';

export default function NewsletterCTA() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <section className="newsletter-cta">
            <div className="container">
                <div className="newsletter-cta__inner">
                    <div className="newsletter-cta__content">
                        <div className="newsletter-cta__dot" aria-hidden="true">
                            <span>•</span>
                        </div>
                        <h2 className="newsletter-cta__headline headline-lg">
                            Your Daily Dot of Truth —<br />in 5 minutes.
                        </h2>
                        <p className="newsletter-cta__sub body-md">
                            Verified news. Zero noise. Delivered every morning at 7 AM WAT.
                        </p>
                        <div className="newsletter-cta__trust">
                            <span className="newsletter-cta__trust-item">✓ No clickbait</span>
                            <span className="newsletter-cta__trust-item">✓ Fact-checked</span>
                            <span className="newsletter-cta__trust-item">✓ Abuja-first</span>
                        </div>
                    </div>

                    <div className="newsletter-cta__form-wrap">
                        {submitted ? (
                            <div className="newsletter-cta__success">
                                <div className="newsletter-cta__success-icon">✓</div>
                                <h3 className="newsletter-cta__success-title">You're in.</h3>
                                <p className="newsletter-cta__success-text">
                                    Welcome to the NEWSDoT community. Your first Daily Dot arrives tomorrow morning.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="newsletter-cta__join-count">
                                    Join <strong>12,000+</strong> Abuja readers
                                </p>
                                <form onSubmit={handleSubmit} className="newsletter-cta__form" id="newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        className="newsletter-cta__input"
                                        id="newsletter-email"
                                        aria-label="Email address for newsletter"
                                    />
                                    <button type="submit" className="btn btn--primary newsletter-cta__submit" id="newsletter-submit">
                                        Subscribe Free
                                    </button>
                                </form>
                                <p className="newsletter-cta__disclaimer">
                                    No spam. Unsubscribe anytime. We protect your data.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
