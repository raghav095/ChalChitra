import heroImage from '../assets/download (1).jpeg'
import React from 'react';
function HeroSection() {
    return (
        <div className='w-screen h-screen'>
            <img src={heroImage} alt="Hero" className='w-full h-full object-cover'/>
        </div>
    );
}

export default HeroSection;
