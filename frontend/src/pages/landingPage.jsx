import { Helmet } from "react-helmet";
import heroImage from '../assets/download (1).jpeg';
import React from 'react';
import Navbar from '../components/navbar.jsx';
import Info from '../components/landingtwo';
import ImageText from '../components/imagetext';
import Line from '../components/line';
import Footer from '../components/Footer';

function HeroSection() {
    return (
        <>
            {/* Hidden SEO Content */}
            <div style={{ display: "none" }}>
                <h1>Watch Free Movies & Series Online – ChalChitra</h1>
                <p>
                    ChalChitra lets you watch the latest movies, web series, TV shows, and online content for free.
                    Stream action, drama, comedy, thriller, and more without any subscription. Enjoy popular movies
                    and hit series anytime, anywhere.
                </p>
                <p>
                    Explore free streaming movies, trending web series, and top TV shows online at ChalChitra.
                </p>
            </div>

            {/* Structured Data for Google (Invisible) */}
            <Helmet>
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
                {/* Hero image as background */}
                <img 
                    src={heroImage} 
                    alt="Hero" 
                    className="absolute inset-0 w-full h-full object-cover -z-10" 
                />
                
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
