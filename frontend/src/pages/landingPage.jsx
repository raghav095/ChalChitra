import { Helmet } from "react-helmet";
import heroImage from '../assets/download (1).jpeg';
import React from 'react';
import Navbar from '../components/navbar.jsx';
import Info from '../components/landingtwo';
import ImageText from '../components/imagetext';
import Line from '../components/line';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function HeroSection() {
    return (
        <>
            {/* Hidden SEO Content */}
            <div style={{ display: "none" }}>
                <h1>Watch Free Movies & TV Series Online – ChalChitra</h1>
                <h2>Stream Latest Movies, Web Series, and Shows for Free</h2>
                <p>
                    ChalChitra is your ultimate destination to watch free movies online, trending web series,
                    and popular TV shows. Enjoy action, drama, comedy, thriller, and more without any subscription.
                    Watch top-rated movies and hit series anytime, anywhere.
                </p>
                <p>
                    Explore free streaming movies, binge-watch web series, and discover online content
                    just like popular OTT platforms, completely free on ChalChitra.
                </p>
                <p>
                    Search and stream the latest films, series, and online shows in HD quality with no registration required.
                </p>
            </div>

            {/* Structured Data & Meta Tags for SEO */}
            <Helmet>
                <title>ChalChitra – Watch Free Movies & TV Series Online</title>
                <meta
                    name="description"
                    content="ChalChitra is the best free streaming site to watch movies, web series, and TV shows online without subscription. Stream trending content anytime for free."
                />
                <meta
                    name="keywords"
                    content="free movies online, watch TV series free, trending web series, stream movies online, watch shows free"
                />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Social Preview */}
                <meta property="og:title" content="ChalChitra – Free Movies & Series Online" />
                <meta
                    property="og:description"
                    content="Stream the latest movies and web series online for free on ChalChitra."
                />
                <meta property="og:image" content="/logotopnew.png" />
                <meta property="og:url" content="https://chalchitra.live" />
                <meta property="og:type" content="website" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "ChalChitra",
                        "url": "https://chalchitra.live",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://chalchitra.live/search?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })}
                </script>
            </Helmet>

            {/* Existing landing page content */}

            <div className="relative w-full h-screen">
                {/* Hero image as background with fade-in animation */}
                <motion.img
                    src={heroImage}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                />
                {/* Only show ImageText above the image */}
                <ImageText />
                {/* Navbar above image */}
                <Navbar />
            </div>

            <Line />
            <Info />
            <Footer />
        </>
    );
}

export default HeroSection;
