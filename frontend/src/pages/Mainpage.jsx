import React, { useEffect, useState } from "react";
import Navbarmain from "../components/Navbarmain";
import MovieRow from "../components/MovieRow.jsx";
import { useDispatch } from "react-redux";
import {login} from "../features/userSlice.js"
import api from '../api/axios';


const Mainpage = () => {

     const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);

    useEffect(() => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          dispatch(login(data.user));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isAuthenticated", "true");
        }
      })
      .catch((err) => {
        
        console.error("Failed to fetch user info:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    async function loadGenres() {
      try {
        const res = await api.get('/api/movies/genres');
        if (!mounted) return;
        // choose a few popular genres to show, limit to 8
        const list = Array.isArray(res.data) ? res.data.slice(0, 8) : [];
        // fallback to a curated selection if TMDB call fails or returns empty
        if (!list || list.length === 0) {
          const fallback = [
            { id: 28, name: 'Action' },
            { id: 12, name: 'Adventure' },
            { id: 35, name: 'Comedy' },
            { id: 18, name: 'Drama' },
            { id: 10749, name: 'Romance' },
            { id: 27, name: 'Horror' },
            { id: 16, name: 'Animation' },
            { id: 878, name: 'Science Fiction' }
          ];
          setGenres(fallback);
        } else {
          setGenres(list);
        }
      } catch (err) {
        console.error('Failed to load genres', err);
        // on error, use curated fallback genres so main page still shows rows
        setGenres([
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
          { id: 35, name: 'Comedy' },
          { id: 18, name: 'Drama' },
          { id: 10749, name: 'Romance' },
        ]);
      }
    }
    loadGenres();
    return () => { mounted = false };
  }, []);



  return (
    <>
      <Navbarmain />
      <div className="w-full min-h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)]">
        <div className="pt-24 px-4"> 
          <MovieRow 
            title="Our Curated Collection" 
            fetchUrl="/api/movies" 
          />

          {/* Genre rows loaded dynamically from TMDB genres (use DB-backed by-genre endpoint) */}
          {genres.map(g => (
            <MovieRow key={g.id} title={g.name} fetchUrl={`/api/movies/by-genre/${g.id}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Mainpage;
