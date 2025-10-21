import React, { use, useEffect } from "react";
import Navbarmain from "../components/Navbarmain";
import MovieRow from "../components/MovieRow.jsx";
import { useDispatch } from "react-redux";
import {login} from "../features/userSlice.js"


const Mainpage = () => {

     const dispatch = useDispatch();

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



  return (
    <>
      <Navbarmain />
      <div className="w-full min-h-screen bg-[linear-gradient(90deg,_#1a2233_0%,_#283a5b_100%)]">
        <div className="pt-24 px-4"> 
          <MovieRow 
            title="Our Curated Collection" 
            fetchUrl="/api/movies" 
          />
          
          {/* You can add more rows like this */}
          {/* <MovieRow title="Classic Cartoons" fetchUrl="/api/movies/cartoons" /> */}
        </div>
      </div>
    </>
  );
};

export default Mainpage;