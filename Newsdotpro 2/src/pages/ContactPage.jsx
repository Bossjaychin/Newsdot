import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './ContactPage.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, this would send an API request to a backend service like Formspree or an internal endpoint.
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    return (
        <div className="contact-page">
            <TopBar />
            
            <main className="contact-main">
                <section className="contact-hero section">
                    <div className="container">
                        <div className="contact-hero__inner">
                            {/* Contact Information (Left Column) */}
                            <div className="contact-info animate-in">
                                <span className="label contact-info__label">Get in Touch</span>
                                <h1 className="headline-xl contact-info__headline">We'd love to hear from you.</h1>
                                <p className="body-lg contact-info__subtext">
                                    Whether you have a tip, a press release, or just want to share feedback on our coverage, our team is ready to listen.
                                </p>
                                
                                <div className="contact-cards">
                                    <div className="contact-card">
                                        <div className="contact-card__icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                                        </div>
                                        <div className="contact-card__text">
                                            <h3>Phone</h3>
                                            <a href="tel:08068460748">08068460748</a>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-card">
                                        <div className="contact-card__icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                        </div>
                                        <div className="contact-card__text">
                                            <h3>Email</h3>
                                            <a href="mailto:info@newsdot.blog">info@newsdot.blog</a>
                                        </div>
                                    </div>
                                    
                                    <div className="contact-card">
                                        <div className="contact-card__icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                        </div>
                                        <div className="contact-card__text">
                                            <h3>Headquarters</h3>
                                            <p>Abuja, Federal Capital Territory, Nigeria</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Contact Form (Right Column) */}
                            <div className="contact-form-wrap animate-in" style={{ animationDelay: '100ms' }}>
                                {submitted ? (
                                    <div className="contact-form__success">
                                        <div className="contact-form__success-icon">✓</div>
                                        <h3 className="headline-md">Message Sent!</h3>
                                        <p className="body-md">Thank you for reaching out to NEWSDoT. Our editorial team will review your message and get back to you shortly.</p>
                                        <button className="btn btn--primary" onClick={() => setSubmitted(false)}>Send another message</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="contact-form">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                value={formData.name} 
                                                onChange={handleChange} 
                                                placeholder="John Doe"
                                                required 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                placeholder="john@example.com"
                                                required 
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <input 
                                                type="text" 
                                                id="subject" 
                                                name="subject" 
                                                value={formData.subject} 
                                                onChange={handleChange} 
                                                placeholder="News Tip / Inquiry"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea 
                                                id="message" 
                                                name="message" 
                                                value={formData.message} 
                                                onChange={handleChange} 
                                                placeholder="How can we help you?"
                                                rows="5"
                                                required 
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn--primary contact-form__submit">
                                            Send Message
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
