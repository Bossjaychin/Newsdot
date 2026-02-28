import { Link } from 'react-router-dom';
import './AbujaBreief.css';

const cityDeskItems = [
    {
        id: 1,
        district: 'FCT Policy',
        headline: 'FCTA Approves Free Bus Service for Civil Servants on 3 Key Routes',
        time: '2h ago',
        tag: 'Transport',
    },
    {
        id: 2,
        district: 'Security',
        headline: 'Police Warn of Fake Checkpoint Officers Operating on Kubwa Expressway',
        time: '3h ago',
        tag: 'Safety',
    },
    {
        id: 3,
        district: 'Events',
        headline: 'National Art Theatre Abuja Hosts Week-Long Cultural Festival Starting Friday',
        time: '4h ago',
        tag: 'Culture',
    },
    {
        id: 4,
        district: 'Infrastructure',
        headline: 'AEPB Announces 72-Hour Water Supply Restoration in Gwarimpa, Lifecamp',
        time: '5h ago',
        tag: 'Utilities',
    },
    {
        id: 5,
        district: 'Transport',
        headline: 'BRT Pilot Programme to Launch on Berger–CBD Corridor Next Month',
        time: '6h ago',
        tag: 'Transport',
    },
];

const cityDeskDistricts = ['Wuse', 'Garki', 'Maitama', 'Asokoro', 'Kubwa', 'Airport Road'];

export default function AbujaBreief() {
    return (
        <section className="abuja-brief section">
            <div className="container">
                <div className="abuja-brief__header">
                    <div className="abuja-brief__title-block">
                        <span className="label abuja-brief__eyebrow">Daily Roundup</span>
                        <h2 className="headline-lg abuja-brief__title">Abuja Brief</h2>
                        <p className="body-md abuja-brief__subtitle">
                            From the City Desk — FCT policy, transport, security and events, curated daily.
                        </p>
                    </div>
                    <div className="abuja-brief__districts">
                        {cityDeskDistricts.map(d => (
                            <button key={d} className="abuja-brief__district-pill">{d}</button>
                        ))}
                    </div>
                </div>

                <div className="abuja-brief__items">
                    {cityDeskItems.map((item, i) => (
                        <article key={item.id} className="abuja-brief__item animate-in" style={{ animationDelay: `${i * 60}ms` }}>
                            <div className="abuja-brief__item-left">
                                <span className="abuja-brief__number">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <div className="abuja-brief__item-body">
                                <div className="abuja-brief__item-meta">
                                    <span className="chip chip--abuja">{item.district}</span>
                                    <span className="card__time">{item.time}</span>
                                </div>
                                <Link to="#" className="abuja-brief__item-headline headline-sm">
                                    {item.headline}
                                </Link>
                            </div>
                            <div className="abuja-brief__item-right">
                                <span className="abuja-brief__item-tag">{item.tag}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="abuja-brief__footer">
                    <Link to="/category/news" className="btn btn--ghost">
                        More Abuja News
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <p className="abuja-brief__update-time">Updated: {new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}, today</p>
                </div>
            </div>
        </section>
    );
}
