import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HeroSection from './pages/landingPage.jsx';
import Mainpage from './pages/Mainpage.jsx';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice.js";
import api from './api/axios';
import MovieDetails from "./components/MoviesDetails.jsx"
import SearchResults from './pages/SearchResults.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Try server-side session first (works for Google OAuth and session-based logins)
    async function fetchMe() {
      try {
        const res = await api.get('/users/me');
        if (res?.data?.user) {
          dispatch(login(res.data.user));
          // Persist to localStorage for back-compat with existing logic
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('isAuthenticated', 'true');
          return;
        }
      } catch (err) {
        // ignore - fall back to localStorage
      }

      const user = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (user && isAuthenticated === 'true') {
        dispatch(login(JSON.parse(user)));
      }
    }

    fetchMe();
  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/Mainpage" element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        } />
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
