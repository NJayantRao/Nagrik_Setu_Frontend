import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import FeaturesSection from "../../components/landing/Features";
import Footer from "../../components/landing/Footer";
import HowItWorksSection from "../../components/landing/HowItWorks";

function Home() {
  const navigate = useNavigate();
  const [phrases] = useState([
    "Together for a Better Community",
    "Report Issues Effortlessly",
    "Empowering Citizens, Driving Change",
    "Transparency at Your Fingertips",
    "Bridging Citizens and Governance",
    "Your Complaints, Our Commitment",
  ]);

  return (
    <div className="w-full bg-[#e0e7ff]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Watermark */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute text-[5rem] sm:text-[10rem] font-black text-white select-none pointer-events-none uppercase"
        >
          NAGRIK SETU
        </motion.h1>

        {/* Main Content */}
        <div className="z-10 text-center px-4 sm:px-10">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl sm:text-8xl font-extrabold text-[#1D4ED8] drop-shadow-lg mb-6"
          >
            NAGRIK SETU
          </motion.h1>

          {/* Typewriter */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-3xl text-gray-700 font-semibold drop-shadow-md"
          >
            <Typewriter
              words={phrases}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.h2>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <button
              onClick={() => navigate("/user/signup")}
              className="bg-white text-[#1D4ED8] font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Home;
