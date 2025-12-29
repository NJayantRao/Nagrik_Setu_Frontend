import React from "react";
import axios from "axios";
import { House, FileText, FilePlusCorner, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ isLoginClicked }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" w-30 absolute bg-gray-200 right-0 text-sm sm:text-lg sm:flex flex-col gap-2 rounded-md shadow-xl p-1 sm:p-5 text-black hover:cursor-pointer z-50"
      style={{ display: isLoginClicked ? "block" : "none" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
        onClick={() => {
          navigate("/user/dashboard");
        }}
      >
        <House size={28} absoluteStrokeWidth />
        <h2>Home</h2>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
        onClick={() => {
          navigate("/user/profile/complaints");
        }}
      >
        <FileText size={28} absoluteStrokeWidth />
        <h2>My Complaints</h2>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
        onClick={() => {
          navigate("/user/profile/complaints/Register");
        }}
      >
        <FilePlusCorner size={28} absoluteStrokeWidth />
        <h2>Raise Complaint</h2>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
        <User size={28} absoluteStrokeWidth />
        <h2>My Profile</h2>
      </div>
      <div className="bg-[#D1FAE5] flex justify-center items-center p-2 hover:scale-105 hover:bg-[#A7F3D0] rounded-xl">
        <div
          className="flex items-center gap-2 text-red-600 cursor-pointer font-medium hover:text-red-700 hover:underline"
          onClick={async () => {
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
    </div>
  );
};

export default DropDown;
