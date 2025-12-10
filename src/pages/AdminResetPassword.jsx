import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../components/loader";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminDataContext } from "../context/AdminContext";

function AdminResetPassword() {
  const navigate = useNavigate();
  const { setAdminUniqueId, adminUniqueId, adminPassword, setAdminPassword } =
    useContext(AdminDataContext);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const notify = (message, type = "success") => {
    const colors = {
      success: "#4f46e5", // Indigo (your success color)
      error: "#dc2626", // Red-600
      info: "#2563eb", // Blue-600
      warning: "#f59e0b", // Amber-500
    };

    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: colors[type],
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/admin/resetPassword`,
        { uniqueId: adminUniqueId, otp, newPassword: adminPassword },
      );
      console.log(adminUniqueId);

      console.log(response);

      console.log(response.data);
      notify(response.data, "success");
      setIsLoading(false);
      setAdminUniqueId("");
      setOtp("");
      setAdminPassword("");
      setIsLoading(true);

      setTimeout(() => {
        navigate("/admin/profile");
      }, 3000);
      // console.log(adminUniqueId);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(error);
        notify(error.response.data, "error");
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    notify();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-3xl font-semibold">
          <h1>Reset Password</h1>
        </div>
        <form
          className="flex flex-col gap-5 w-full p-3"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Enter Your Unique ID
            <input
              type="text"
              placeholder="ADM-XYZA-12345678"
              name="uniqueId"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminUniqueId ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={adminUniqueId}
              onChange={(e) => {
                setAdminUniqueId(e.target.value);
                //console.log(uniqueToken);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            Enter OTP
            <input
              type="text"
              placeholder="123456"
              name="otp"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${otp ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={otp}
              maxLength={6}
              minLength={6}
              onChange={(e) => {
                setOtp(e.target.value);
                //console.log(uniqueId);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg ">
            Enter New Password
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter New Password"
                name="password"
                className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminPassword ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  //console.log(password);
                }}
                minLength={8}
                maxLength={20}
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminResetPassword;
