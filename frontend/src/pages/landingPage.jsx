import heroImage from '../assets/download (1).jpeg'
import React from 'react';
import Navbar from '../components/navbar';
import Info from '../components/landingtwo';
import ImageText from '../components/imagetext';
import Line from '../components/line';
import Footer from '../components/Footer';





function HeroSection() {
    return (
        <>
            <div className="relative w-screen h-screen">
                {/* Hero image as background */}
                <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover -z-10" />


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
