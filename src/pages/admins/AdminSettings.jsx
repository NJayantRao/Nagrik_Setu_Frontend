import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const spinSlow = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 18,
      ease: "linear",
    },
  },
};

const spinFastReverse = {
  animate: {
    rotate: -360,
    transition: {
      repeat: Infinity,
      duration: 10,
      ease: "linear",
    },
  },
};

export default function SettingsWIP() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 7000);
  }, []);
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#f9fafb] to-[#eef2ff] flex items-center justify-center relative overflow-hidden">
      {/* Background watermark */}
      <h1 className="absolute text-[10rem] font-black text-blue-900 opacity-[0.04] select-none">
        SETTINGS
      </h1>

      {/* Cog animations */}
      <div className="relative flex items-center justify-center">
        {/* Big Cog */}
        <motion.div
          variants={spinSlow}
          animate="animate"
          className="absolute text-blue-600 opacity-30"
        >
          <Settings size={220} strokeWidth={1.2} />
        </motion.div>

        {/* Medium Cog */}
        <motion.div
          variants={spinFastReverse}
          animate="animate"
          className="absolute -right-32 top-20 text-indigo-500 opacity-40"
        >
          <Settings size={140} strokeWidth={1.5} />
        </motion.div>

        {/* Small Cog */}
        <motion.div
          variants={spinSlow}
          animate="animate"
          className="absolute left-32 -bottom-20 text-sky-500 opacity-50"
        >
          <Settings size={90} strokeWidth={1.8} />
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl px-12 py-10 text-center max-w-lg"
        >
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
            Settings Under Construction
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            We're fine-tuning powerful controls to give you a smoother, smarter
            experience. 🚀
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
