import TopBar from '../components/TopBar';
import HeroSection from '../components/HeroSection';
import LatestGrid from '../components/LatestGrid';
import AbujaBreief from '../components/AbujaBreief';
import NewsletterCTA from '../components/NewsletterCTA';
import Footer from '../components/Footer';
import { heroArticle, latestArticles } from '../data/articles';

export default function HomePage() {
    return (
        <>
            <TopBar />
            <main>
                <HeroSection article={heroArticle} />
                <LatestGrid articles={latestArticles} />
                <AbujaBreief />
                <NewsletterCTA />
            </main>
            <Footer />
        </>
    );
}
