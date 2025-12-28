import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  const phrases = [
    "Report Issues Effortlessly",
    "Empowering Citizens, Driving Change",
    "Transparency at Your Fingertips",
    "Bridging Citizens and Governance",
    "Your Complaints, Our Commitment",
    "Together for a Better Community",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero"
    >
      {/* Watermark */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="watermark-text"
      >
        NAGRIK SETU
      </motion.h1>

      {/* Main Content */}
      <div className="z-10 text-center px-4 sm:px-10 pt-20">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-8xl font-extrabold text-primary drop-shadow-lg mb-6 font-heading"
        >
          NAGRIK SETU
        </motion.h1>

        {/* Typewriter */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl sm:text-3xl text-muted-foreground font-semibold drop-shadow-md h-12"
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
            variant="hero"
            size="xl"
            className="shadow-hero hover:shadow-2xl hover:scale-105 transition-all"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16"
        >
          {[
            { number: "50K+", label: "Issues Resolved" },
            { number: "100+", label: "Departments" },
            { number: "10L+", label: "Citizens Served" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
