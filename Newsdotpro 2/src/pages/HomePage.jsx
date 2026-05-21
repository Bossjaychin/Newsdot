import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import LatestGrid from '../components/LatestGrid';
import AbujaBreief from '../components/AbujaBreief';
import NewsletterCTA from '../components/NewsletterCTA';
import Footer from '../components/Footer';
import { getHeroArticle, getLatestArticles } from '../data/articles';

export default function HomePage() {
    const [heroArticle, setHeroArticle]     = useState(null);
    const [latestArticles, setLatestArticles] = useState([]);
    const [loading, setLoading]             = useState(true);

    useEffect(() => {
        Promise.all([getHeroArticle(), getLatestArticles(9)])
            .then(([hero, latest]) => {
                setHeroArticle(hero);
                setLatestArticles(latest);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <TopBar />
            <main>
                {loading ? (
                    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
                        <p>Loading stories…</p>
                    </div>
                ) : (
                    <>
                        <HeroSection article={heroArticle} />
                        <LatestGrid articles={latestArticles} />
                        <AbujaBreief />
                        <NewsletterCTA />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
