import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HeroSection from './pages/landingPage.jsx';
import Mainpage from './pages/Mainpage.jsx';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice.js";
import MovieDetails from "./components/MoviesDetails.jsx"
import SearchResults from './pages/SearchResults.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (user && isAuthenticated === 'true') {
      dispatch(login(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
