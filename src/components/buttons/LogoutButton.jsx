import React from "react";
import axios from "axios";
import { House, FileText, FilePlusCorner, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();
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
  return (
    <div className="bg-[#A7F3D0] sm:bg-[#D1FAE5] flex justify-center items-center p-2 hover:scale-105 hover:bg-[#A7F3D0] rounded-xl">
      <div
        className="flex items-center gap-2 text-red-600 cursor-pointer font-medium hover:text-red-700 hover:underline"
        onClick={async (e) => {
          try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get(
              `${import.meta.env.VITE_LOCAL_URL}/user/logout`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            localStorage.removeItem("token");
            // console.log(response);
            notify(response.data, "success");
            navigate("/");
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }}
      >
        <LogOut size={18} />
        Logout
      </div>
    </div>
  );
};

export default LogoutButton;
