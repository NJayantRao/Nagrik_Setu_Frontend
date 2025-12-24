import {useNavigate} from "react-router-dom"

function ErrorPage() {
  const navigate= useNavigate()
  return (
    <div className="h-screen w-full bg-[#e0e7ff] flex items-center justify-center relative overflow-hidden">

      {/* Watermark Background Text */}
      <h1 className="absolute text-[6rem] sm:text-[12rem] font-black text-[#1e3a8a] opacity-10 select-none pointer-events-none">
        404
      </h1>

      {/* Main Content */}
      <div className="text-center z-10 px-5">
        <h2 className="text-4xl sm:text-6xl font-extrabold text-[#1D4ED8] drop-shadow-md mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-700 text-lg sm:text-xl mb-8 font-medium">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        <button
          // onClick={() => (window.location.href = "/")}
          onClick={() => navigate("/")}
          className="bg-white text-[#1D4ED8] font-bold px-6 py-3 rounded-xl shadow-lg 
                     hover:shadow-2xl hover:scale-105 transition-all hover:cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
