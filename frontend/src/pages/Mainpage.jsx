import React from "react";
import Navbarmain from "../components/Navbarmain";

const Mainpage = () => {
  return (
    <>
      <Navbarmain />
      <div className="box w-full h-screen bg-black/90 backdrop-blur-md border border-white/30">
        <div></div>
      </div>
    </>
  );
};

export default Mainpage;
