import { motion } from "framer-motion";
import { User, ShieldCheck, Activity } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Animations */
const spinSlow = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 20,
      ease: "linear",
    },
  },
};

const floatUpDown = {
  animate: {
    y: [0, -12, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  },
};

const spinReverse = {
  animate: {
    rotate: -360,
    transition: {
      repeat: Infinity,
      duration: 14,
      ease: "linear",
    },
  },
};

function UserProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#eef2ff] to-[#f8fafc] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background watermark */}
      <h1 className="absolute text-[4rem] sm:text-[7rem] lg:text-[9rem] font-black text-blue-900 opacity-[0.04] select-none">
        PROFILE
      </h1>

      {/* Animated Icons */}
      <div className="relative flex items-center justify-center w-full max-w-3xl">
        {/* Large User Icon */}
        <motion.div
          variants={spinSlow}
          animate="animate"
          className="absolute text-blue-600 opacity-30 scale-75 sm:scale-100"
        >
          <User size={180} className="sm:size-[220px]" strokeWidth={1.2} />
        </motion.div>

        {/* Shield Icon */}
        <motion.div
          variants={spinReverse}
          animate="animate"
          className="absolute -left-16 sm:-left-32 top-16 sm:top-20 text-indigo-500 opacity-40"
        >
          <ShieldCheck
            size={100}
            className="sm:size-[140px]"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Activity Icon */}
        <motion.div
          variants={floatUpDown}
          animate="animate"
          className="absolute right-16 sm:right-32 -bottom-16 sm:-bottom-20 text-sky-500 opacity-50"
        >
          <Activity size={70} className="sm:size-[90px]" strokeWidth={1.8} />
        </motion.div>

        {/* Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl px-6 sm:px-10 py-8 sm:py-10 text-center w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4">
            Profile Page Under Construction
          </h2>

          <p className="text-gray-600 text-base sm:text-lg mb-6">
            We’re building a secure and personalized profile experience just for
            you. Stay tuned! ✨
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Work in progress
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
