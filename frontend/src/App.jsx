import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HeroSection from './pages/landingPage.jsx';
import Mainpage from './pages/Mainpage.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/Mainpage" element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
