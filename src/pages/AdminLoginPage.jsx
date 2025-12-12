import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../context/AdminContext";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../components/loader";
import axios from "axios";
import { toast } from "react-toastify";

function AdminLoginPage() {
  const navigate = useNavigate();
  const {
    adminName,
    setAdminName,
    adminEmail,
    setAdminEmail,
    adminPassword,
    setAdminPassword,
    adminAddress,
    setAdminAddress,
    adminPhone,
    setAdminPhone,
    adminUniqueId,
    setAdminUniqueId,
  } = useContext(AdminDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(adminUniqueId, adminPassword);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/admin/login`,
        {
          uniqueId: adminUniqueId,
          password: adminPassword,
        },
        { withCredentials: true }
      );
      setIsLoading(true);
      const token = response.data.token;
      console.log(response.data.token);

      localStorage.setItem("token", JSON.stringify(token));

      setTimeout(() => {
        setIsLoading(false);
        navigate("/admin/profile");
      }, 3000);
      setAdminUniqueId("");
      setAdminPassword("");
    } catch (error) {
      console.log(error);
      // setIsLoading(false)
      if (error.response?.status === 401) {
        notify(error.response.data, "error");
        setAdminUniqueId("");
        setAdminPassword("");
      } else {
        console.log(error);
      }
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-3xl font-semibold">
          <h1>Login</h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Unique ID
            <input
              type="text"
              placeholder="ADM-XYZA-12345678"
              name="uniqueId"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminUniqueId ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={adminUniqueId}
              onChange={(e) => {
                setAdminUniqueId(e.target.value);
                //console.log(adminUniqueId);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg ">
            Password
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Your Password"
                name="password"
                className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminPassword ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  //console.log(adminPassword);
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
          <div className="font-semibold text-gray-600 text-base flex justify-between items-center p-2">
            <div className="flex gap-2">
              <input type="checkbox" name="Remember" id="Remember" />
              <h2>Remember Me</h2>
            </div>
            <div>
              <h2
                className="hover:text-gray-700 hover:font-bold hover:cursor-pointer"
                onClick={() => {
                  navigate("/admin/forgotPassword");
                }}
              >
                Forgot Password?
              </h2>
            </div>
          </div>
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
