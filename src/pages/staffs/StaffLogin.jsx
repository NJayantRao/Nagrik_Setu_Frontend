import { motion } from "framer-motion";
import { ShieldCheck, UserCog } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Animation presets */
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

const spinFastReverse = {
  animate: {
    rotate: -360,
    transition: {
      repeat: Infinity,
      duration: 12,
      ease: "linear",
    },
  },
};

function StaffLoginWIP() {
  const navigate = useNavigate();

  // Optional redirect (change/remove if not needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // or /admin/login later
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] flex items-center justify-center relative overflow-hidden">
      {/* Background watermark */}
      <h1 className="absolute text-[8rem] sm:text-[10rem] font-black text-indigo-900 opacity-[0.04] select-none">
        STAFF ACCESS
      </h1>

      {/* Animated icons */}
      <div className="relative flex items-center justify-center">
        {/* Large Shield */}
        <motion.div
          variants={spinSlow}
          animate="animate"
          className="absolute text-indigo-600 opacity-25"
        >
          <ShieldCheck size={220} strokeWidth={1.2} />
        </motion.div>

        {/* Medium Cog */}
        <motion.div
          variants={spinFastReverse}
          animate="animate"
          className="absolute -right-32 top-16 text-blue-500 opacity-35"
        >
          <UserCog size={140} strokeWidth={1.5} />
        </motion.div>

        {/* Small Cog */}
        <motion.div
          variants={spinSlow}
          animate="animate"
          className="absolute left-32 -bottom-20 text-sky-500 opacity-45"
        >
          <UserCog size={90} strokeWidth={1.8} />
        </motion.div>

        {/* Center Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl px-12 py-10 text-center max-w-lg"
        >
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
            Staff Login Coming Soon
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            Secure staff access is currently under development. Advanced
            authentication and role-based controls are being prepared.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Restricted access · Work in progress
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default StaffLoginWIP;
