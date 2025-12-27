import { useNavigate } from "react-router-dom";

function Errors({ status, message }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#e0e7ff] flex items-center justify-center relative overflow-hidden">
      {/* BIG watermark */}
      <h1 className="absolute text-[10rem] sm:text-[20rem] font-extrabold text-[#1e3a8a] opacity-[0.07] select-none pointer-events-none tracking-widest">
        {status}
      </h1>

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-3xl">
        {/* Title */}
        <h2 className="text-5xl sm:text-7xl font-extrabold text-[#1D4ED8] drop-shadow-lg mb-6 tracking-tight sm:whitespace-nowrap">
          {message}
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-xl sm:text-2xl mb-10 font-medium leading-relaxed">
          Error {status}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-5 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-[#1D4ED8] font-bold px-6 py-3 rounded-xl shadow-lg 
                     hover:shadow-2xl hover:scale-105 transition-all text-lg sm:text-xl"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-[#1D4ED8] text-white font-bold px-6 py-3 rounded-xl shadow-lg 
                     hover:shadow-2xl hover:scale-105 transition-all text-lg sm:text-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Errors;
