import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Footer from "../../components/landing/Footer";

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
        {/* ===== Animated Gradient Background ===== */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-400 rounded-full blur-3xl opacity-60"
            animate={{ x: [0, 100, 0], y: [0, 80, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-3xl opacity-60"
            animate={{ x: [0, -120, 0], y: [0, -100, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-200px] left-1/4 w-[700px] h-[700px] bg-purple-300 rounded-full blur-3xl opacity-50"
            animate={{ x: [0, 80, 0], y: [0, -120, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* ===== Grid Overlay (Civic Feel) ===== */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(29,78,216,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,78,216,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* ===== Watermark ===== */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 1.2 }}
          className="absolute z-0 text-[5rem] sm:text-[10rem] font-black text-white select-none pointer-events-none uppercase"
        >
          NAGRIK SETU
        </motion.h1>

        {/* ===== Main Content ===== */}
        <div className="z-10 text-center px-4 sm:px-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-8xl font-extrabold text-[#1D4ED8] drop-shadow-lg mb-6"
          >
            NAGRIK SETU
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <button
              onClick={() => navigate("/user/signup")}
              className="bg-white text-[#1D4ED8] font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
