import { useState } from 'react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import './SubscribePage.css';

export default function SubscribePage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    // User subscription details
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    
    // Successful subscription state
    const [subscribedPlan, setSubscribedPlan] = useState(null);
    const [transactionRef, setTransactionRef] = useState('');

    const plans = [
        {
            id: 'free',
            name: 'Free Daily Dot',
            price: '₦0',
            period: 'forever',
            description: 'Essential political and general news updates delivered directly to your inbox.',
            perks: [
                'Access to standard public articles',
                'Daily general newsletter summaries',
                'Basic braking news alerts via email',
                'Standard reading interface'
            ],
            cta: 'Register Free',
            premium: false
        },
        {
            id: 'premium',
            name: 'Premium Truth',
            price: '₦2,000',
            period: 'month',
            description: 'Unrestricted access to investigative journalism and policy analysis briefings.',
            perks: [
                'Full ad-free experience on all devices',
                'Exclusive member-only deep-dive investigations',
                'Audio article player & offline reading packs',
                'FCT Abuja Policy Brief (PDF) download',
                'Early access to editorial viewpoints'
            ],
            cta: 'Subscribe Now',
            popular: true,
            premium: true
        },
        {
            id: 'patron',
            name: 'Patron of the Press',
            price: '₦10,000',
            period: 'month',
            description: 'For organizations and leaders dedicated to fostering democracy & integrity in public office.',
            perks: [
                'All benefits of the Premium Truth tier',
                'Complimentary invite to monthly editorial roundtable meetings',
                'Organization-wide reading licenses (up to 5 users)',
                'Annual Abuja Policy Outlook hardcopy briefing pack',
                'Sponsor name listed on the NEWSDoT Patron Roll (optional)'
            ],
            cta: 'Join as Patron',
            premium: true
        }
    ];

    const openCheckout = (plan) => {
        setSelectedPlan(plan);
        setModalOpen(true);
        setPaymentSuccess(false);
        setPaymentProcessing(false);
    };

    const closeCheckout = () => {
        setModalOpen(false);
        setSelectedPlan(null);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!email.trim() || !name.trim()) {
            alert('Please fill in your name and email address.');
            return;
        }

        if (selectedPlan.premium && (!cardNumber || !cardExpiry || !cardCvv)) {
            alert('Please complete the card information for payment.');
            return;
        }

        setPaymentProcessing(true);

        // Simulate Paystack authentication & processing network latency
        setTimeout(() => {
            setPaymentProcessing(false);
            setPaymentSuccess(true);
            setSubscribedPlan(selectedPlan);
            
            // Generate a realistic transaction reference number
            const randHex = Math.random().toString(16).substring(2, 10).toUpperCase();
            setTransactionRef(`ND-PAY-${randHex}`);
        }, 2200);
    };

    // Download simulated premium Abuja Policy Brief PDF
    const downloadPolicyBrief = () => {
        const briefContent = `========================================================================
NEWSDoT PREMIUM INTELLIGENCE BRIEFING: ABUJA MASTER PLAN 2026
========================================================================
Security Classification: MEMBER EXCLUSIVE (CONFIDENTIAL)
Publication Date: May 21, 2026
Prepared By: NEWSDoT Abuja Policy & Municipal Research Desk

------------------------------------------------------------------------
EXECUTIVE SUMMARY: THE ₦680bn FCT ADMINISTRATIVE & URBAN RECONSTRUCT
------------------------------------------------------------------------
The Federal Capital Territory Administration (FCTA) under Barr. Nyesom Wike 
has commenced the implementation of the 2026 FCT Master Plan Revision, 
representing an unprecedented ₦680 billion investment framework. This 
reconstruction addresses rapid population expansion, decaying municipal 
infrastructure, and the critical need to decentralize economic activity 
from the Abuja Municipal Area Council (AMAC) into the surrounding satellite towns.

------------------------------------------------------------------------
KEY MUNICIPAL DEVELOPMENTS & DISTRICT ALLOCATIONS
------------------------------------------------------------------------
1. DISTRICT GAZETTING & PROPERTY ACQUISITION
   - 14 new residential and commercial districts have been gazetted in the 
     Northern District axis (Dape, Katampe Extension Phase II, and Bwari corridor).
   - Expected land allocation permits will release approximately 8,500 hectares 
     for medium-to-high density housing, targeted at civil servants and mid-tier 
     commercial developments.

2. TRANSPORT & MOBILITY CORRIDORS
   - Abuja Light Rail Phase II: Dedicated allocation of ₦145 billion for 
     double-tracking the airport-city corridor and completing Bwari-Kubwa linkages.
   - Ring Road 4 Construction: Establishing a bypass connecting Karu, Nyanya, 
     and Gwarimpa to bypass inner city traffic congestion.

3. ECONOMIC & INDUSTRIAL FORECASTS
   - Jabi and CBD Technology Districts: Subsidized broadband corridors and land grants 
     aimed at tech startup accelerators, estimated to unlock 120,000 auxiliary jobs.
   - Gwagwalada Industrial Hub: Revision of zoning rights to establish clean 
     processing units and agricultural sorting warehouses.

------------------------------------------------------------------------
BUDGETARY SPENDING BREAKDOWN (2026 - 2030)
------------------------------------------------------------------------
- Transport Infrastructure & Rail Lines:  32%  (₦217.6 Billion)
- Healthcare & Satellite District Clinics: 18%  (₦122.4 Billion)
- Water Treatment & Sanitation Lines:     25%  (₦170.0 Billion)
- Land Reclamation & Security Buffer:    15%  (₦102.0 Billion)
- Technology Hubs & Incubation Grants:   10%  (₦68.0 Billion)

------------------------------------------------------------------------
CRITICAL RISKS & POLICY ANALYSIS
------------------------------------------------------------------------
* Regulatory Risk: Displacements in informal settlements bordering Lugbe and 
  Karshi are likely to spark litigation and labor delays.
* Funding Deficit: FCTA relies on internal revenue generation (IGR) increases 
  (principally Ground Rent audit). Any contraction in real estate valuation 
  could delay light rail timelines.

------------------------------------------------------------------------
VERIFICATION CERTIFICATE
------------------------------------------------------------------------
This briefing is licensed to NEWSDoT Member: ${name || 'Premium Subscriber'}
Verification Code: ${transactionRef || 'ND-OFFLINE-VERIFIED'}
All rights reserved. NEWSDoT (c) 2026.
========================================================================`;

        const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `NEWSDoT_Abuja_Policy_Brief_${subscribedPlan?.id || 'Premium'}.txt`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <TopBar />
            <main className="subscribe-page-container">
                {/* Intro Section */}
                <section className="subscribe-hero animate-in">
                    <div className="container">
                        <span className="subscribe-badge">NEWSDoT MEMBERSHIP</span>
                        <h1 className="headline-xl subscribe-hero__title">Support Truth. Empower Independent Journalism.</h1>
                        <p className="body-lg subscribe-hero__subtitle">
                            Join a network of citizens and business leaders who value credibility over sensationalism. 
                            Choose a tier to unlock in-depth Nigerian public interest reports and executive briefings.
                        </p>
                    </div>
                </section>

                {/* Subscribed Dashboard State */}
                {subscribedPlan && (
                    <section className="section subscribe-success-banner animate-in">
                        <div className="container container--narrow">
                            <div className="success-dashboard-card">
                                <div className="success-check-badge">✓</div>
                                <h2 className="headline-md">Welcome to the NEWSDoT Inner Circle</h2>
                                <p className="body-md">
                                    Your <strong>{subscribedPlan.name}</strong> membership is active! 
                                    Thank you for your invaluable support in keeping public interest journalism independent and rigorous in Nigeria.
                                </p>
                                
                                <div className="member-status-info">
                                    <div className="member-status-item">
                                        <span className="info-label">Member Tier</span>
                                        <span className="info-value text-accent">{subscribedPlan.name}</span>
                                    </div>
                                    <div className="member-status-item">
                                        <span className="info-label">Receipt Code</span>
                                        <span className="info-value font-mono">{transactionRef}</span>
                                    </div>
                                    <div className="member-status-item">
                                        <span className="info-label">Authorized Subscriber</span>
                                        <span className="info-value">{name} ({email})</span>
                                    </div>
                                </div>

                                {subscribedPlan.premium && (
                                    <div className="premium-perk-unlock animate-in">
                                        <div className="perk-icon-wrap">🎁</div>
                                        <div className="perk-content">
                                            <h4 className="headline-sm">Abuja Policy Brief (2026 Executive Draft)</h4>
                                            <p className="body-sm text-secondary">
                                                Your premium membership unlocks our comprehensive research detailing the ₦680bn FCT urban plan and capital allocations.
                                            </p>
                                            <button 
                                                onClick={downloadPolicyBrief} 
                                                className="btn btn--primary download-brief-btn"
                                            >
                                                Download Policy Brief (.txt)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Pricing Tiers Section */}
                <section className="section pricing-section">
                    <div className="container">
                        <div className="pricing-grid">
                            {plans.map(plan => {
                                const isCurrent = subscribedPlan?.id === plan.id;
                                return (
                                    <div 
                                        key={plan.id} 
                                        className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''} ${isCurrent ? 'pricing-card--active' : ''}`}
                                    >
                                        {plan.popular && <span className="popular-badge">Most Popular</span>}
                                        {isCurrent && <span className="active-badge">Your Active Tier</span>}
                                        
                                        <div className="pricing-card__header">
                                            <h3 className="headline-md pricing-card__name">{plan.name}</h3>
                                            <p className="body-sm pricing-card__desc">{plan.description}</p>
                                            <div className="pricing-card__price-wrapper">
                                                <span className="pricing-card__price">{plan.price}</span>
                                                <span className="pricing-card__period">/{plan.period}</span>
                                            </div>
                                        </div>

                                        <div className="pricing-card__body">
                                            <div className="pricing-card__divider"></div>
                                            <ul className="pricing-card__perks">
                                                {plan.perks.map((perk, i) => (
                                                    <li key={i} className="pricing-card__perk-item">
                                                        <svg className="perk-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <path d="M20 6 9 17l-5-5" />
                                                        </svg>
                                                        <span className="body-sm">{perk}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pricing-card__footer">
                                            <button
                                                onClick={() => openCheckout(plan)}
                                                className={`btn w-100 pricing-card__cta-btn ${plan.popular ? 'btn--primary' : 'btn--ghost'} ${isCurrent ? 'btn--disabled' : ''}`}
                                                disabled={isCurrent}
                                            >
                                                {isCurrent ? 'Current Plan' : plan.cta}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Compare Grid */}
                <section className="section comparison-section">
                    <div className="container">
                        <div className="section-header justify-center">
                            <h2 className="headline-lg section-header__title text-center">Compare Subscription Benefits</h2>
                        </div>
                        <div className="comparison-table-wrap">
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Features & Benefits</th>
                                        <th>Free Daily Dot</th>
                                        <th>Premium Truth</th>
                                        <th>Patron of the Press</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Verification & Fact-Checking Badges</td>
                                        <td>✓ Standard</td>
                                        <td>✓ Full access</td>
                                        <td>✓ Full access</td>
                                    </tr>
                                    <tr>
                                        <td>Ad-Free Layout</td>
                                        <td>✗ Standard ads</td>
                                        <td>✓ 100% Ad-free</td>
                                        <td>✓ 100% Ad-free</td>
                                    </tr>
                                    <tr>
                                        <td>Deep-Dive Investigations</td>
                                        <td>✗ Standard news only</td>
                                        <td>✓ Unlimited access</td>
                                        <td>✓ Unlimited access</td>
                                    </tr>
                                    <tr>
                                        <td>Executive Abuja Policy Brief (PDF)</td>
                                        <td>✗ Restricted</td>
                                        <td>✓ Instantly unlocked</td>
                                        <td>✓ Instantly unlocked</td>
                                    </tr>
                                    <tr>
                                        <td>Editorial Policy Roundtables</td>
                                        <td>✗ Restricted</td>
                                        <td>✗ Restricted</td>
                                        <td>✓ VIP Invite</td>
                                    </tr>
                                    <tr>
                                        <td>Sponsorship Board Recognition</td>
                                        <td>✗ Restricted</td>
                                        <td>✗ Restricted</td>
                                        <td>✓ Optional list</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section faq-section">
                    <div className="container container--narrow">
                        <div className="section-header">
                            <h2 className="headline-lg section-header__title">Frequently Asked Questions</h2>
                        </div>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h4 className="headline-sm faq-question">Why does NEWSDoT have a subscription system?</h4>
                                <p className="body-md faq-answer text-secondary">
                                    Quality investigative journalism is expensive. By offering premium subscriptions, we ensure that our reporters 
                                    remain financially independent of political sponsors and corporate influencers, keeping our loyalty purely 
                                    with public truth.
                                </p>
                            </div>
                            <div className="faq-item">
                                <h4 className="headline-sm faq-question">Can I cancel my monthly subscription at any time?</h4>
                                <p className="body-md faq-answer text-secondary">
                                    Yes. You can manage, upgrade, or cancel your subscription at any time from your member dashboard with a single click. 
                                    No cancellation fees.
                                </p>
                            </div>
                            <div className="faq-item">
                                <h4 className="headline-sm faq-question">How does the simulated Paystack gate work?</h4>
                                <p className="body-md faq-answer text-secondary">
                                    To demonstrate integration with Nigeria's premium payment provider, we have built a beautiful, fully functional 
                                    Paystack checkout simulator. It mirrors standard processing actions, triggers sandboxed receipts, and unlocks 
                                    real premium downloads on our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Paystack Checkout Modal Simulation */}
                {modalOpen && selectedPlan && (
                    <div className="paystack-overlay animate-in" onClick={closeCheckout}>
                        <div className="paystack-modal" onClick={e => e.stopPropagation()}>
                            {/* Header */}
                            <div className="paystack-header">
                                <div className="paystack-merchant-info">
                                    <div className="paystack-logo-wrap">
                                        <span className="paystack-p">p</span>
                                    </div>
                                    <div className="merchant-details">
                                        <h4 className="merchant-name">NEWSDoT Newsroom</h4>
                                        <span className="merchant-url">newsdot.ng</span>
                                    </div>
                                </div>
                                <div className="paystack-amount-info">
                                    <span className="plan-name-badge">{selectedPlan.name}</span>
                                    <h3 className="plan-amount">{selectedPlan.price}</h3>
                                </div>
                                <button className="paystack-close-btn" onClick={closeCheckout}>✕</button>
                            </div>

                            {/* Body Form */}
                            <div className="paystack-body">
                                {!paymentSuccess ? (
                                    <form onSubmit={handlePaymentSubmit} className="paystack-form">
                                        <div className="form-group">
                                            <label className="paystack-label" htmlFor="billing-email">Email Address</label>
                                            <input 
                                                type="email" 
                                                id="billing-email"
                                                placeholder="email@example.com"
                                                className="paystack-input"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="paystack-label" htmlFor="billing-name">Cardholder Name</label>
                                            <input 
                                                type="text" 
                                                id="billing-name"
                                                placeholder="Adamu Musa"
                                                className="paystack-input"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {selectedPlan.premium ? (
                                            <>
                                                <div className="form-group">
                                                    <label className="paystack-label" htmlFor="billing-card">Card Number</label>
                                                    <div className="card-input-wrap">
                                                        <input 
                                                            type="text" 
                                                            id="billing-card"
                                                            placeholder="4012 8831 9002 1125"
                                                            className="paystack-input card-input"
                                                            value={cardNumber}
                                                            onChange={e => setCardNumber(e.target.value)}
                                                            maxLength="19"
                                                            required
                                                        />
                                                        <span className="card-brand-logo">VISA</span>
                                                    </div>
                                                </div>

                                                <div className="form-row-2">
                                                    <div className="form-group">
                                                        <label className="paystack-label" htmlFor="billing-expiry">Expiry Date</label>
                                                        <input 
                                                            type="text" 
                                                            id="billing-expiry"
                                                            placeholder="MM / YY"
                                                            className="paystack-input"
                                                            value={cardExpiry}
                                                            onChange={e => setCardExpiry(e.target.value)}
                                                            maxLength="7"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="paystack-label" htmlFor="billing-cvv">CVV</label>
                                                        <input 
                                                            type="password" 
                                                            id="billing-cvv"
                                                            placeholder="123"
                                                            className="paystack-input"
                                                            value={cardCvv}
                                                            onChange={e => setCardCvv(e.target.value)}
                                                            maxLength="4"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="free-registration-alert">
                                                This is a free plan. Click below to register without any billing charges.
                                            </div>
                                        )}

                                        <button 
                                            type="submit" 
                                            className="paystack-submit-btn"
                                            disabled={paymentProcessing}
                                        >
                                            {paymentProcessing ? (
                                                <span className="paystack-spinner-wrap">
                                                    <span className="paystack-spinner"></span>
                                                    Authorizing Card...
                                                </span>
                                            ) : (
                                                `Pay ${selectedPlan.price}`
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="paystack-success-receipt animate-in">
                                        <div className="paystack-success-icon-wrap">
                                            <svg className="paystack-success-check" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <h3 className="receipt-title">Payment Successful</h3>
                                        <p className="receipt-subtitle">Transaction processed secure by Paystack</p>
                                        
                                        <div className="receipt-details">
                                            <div className="receipt-row">
                                                <span>Merchant</span>
                                                <strong>NEWSDoT Newsroom</strong>
                                            </div>
                                            <div className="receipt-row">
                                                <span>Ref ID</span>
                                                <span className="font-mono">{transactionRef}</span>
                                            </div>
                                            <div className="receipt-row">
                                                <span>Amount</span>
                                                <strong>{selectedPlan.price}</strong>
                                            </div>
                                            <div className="receipt-row">
                                                <span>Status</span>
                                                <span className="status-badge success">Approved</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={closeCheckout} 
                                            className="btn btn--primary paystack-done-btn"
                                        >
                                            Unlock My Dashboard
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="paystack-footer">
                                <span className="paystack-secured-text">
                                    🛡️ Secured by <strong>paystack</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
