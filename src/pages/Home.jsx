import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  const [phrases, setPhrases] = useState([
    "Report Issues Effortlessly",
    "Empowering Citizens, Driving Change",
    "Transparency at Your Fingertips",
    "Bridging Citizens and Governance",
    "Your Complaints, Our Commitment",
    "Together for a Better Community"
  ]);

  return (
    <div className="relative h-screen w-full bg-[#e0e7ff] flex items-center justify-center overflow-hidden">
      {/* Watermark Logo/Text */}
      <h1 className="absolute text-[5rem] sm:text-[10rem] font-black text-white opacity-10 select-none pointer-events-none uppercase">
        NAGRIK SETU
      </h1>

      {/* Main Content */}
      <div className="z-10 text-center px-4 sm:px-10">
        {/* Big Bold Title */}
        <h1 className="text-6xl sm:text-8xl font-extrabold text-[#1D4ED8] drop-shadow-lg mb-6">
          NAGRIK SETU
        </h1>

        {/* Typewriter Catchphrases */}
        <h2 className="text-xl sm:text-3xl text-gray-700 font-semibold drop-shadow-md">
          <Typewriter
            words={phrases}
            loop={0} // infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h2>

        {/* Call to Action Button */}
        <div className="mt-10">
          <button
            onClick={() => (window.location.href = "/user/signup")}
            className="bg-white text-[#1D4ED8] font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
