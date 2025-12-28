import React from "react";
import {
  ShieldUser,
  ChartNoAxesCombined,
  FileExclamationPoint,
  UserRoundCog,
  UsersRound,
  LogOut,
  Settings,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../buttons/AdminLogout";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1a3366] flex flex-col min-h-screen w-1/5 text-white ">
      <div className="flex gap-2 p-4">
        <div className="bg-[#faa005] p-2 flex justify-center items-center rounded-xl text-black">
          <ShieldUser size={36} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold ">Nagrik Setu</h2>
          <p className="text-[#bac2d1] font-semibold">Admin Portal</p>
        </div>
      </div>
      <hr className="w-full my-2  border-[#5d6d8a]" />
      <div className="flex flex-col gap-2 py-2 px-4">
        <button
          className="flex gap-3 items-center hover:bg-[#faa005] hover:text-black 
  focus:bg-[#faa005] focus:text-black px-4 py-2 text-left text-lg font-semibold rounded-xl cursor-pointer"
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          <ChartNoAxesCombined size={30} />
          <h3>Dashboard</h3>
        </button>
        <button
          className="flex gap-3 items-center hover:bg-[#faa005] hover:text-black 
  focus:bg-[#faa005] focus:text-black px-4 py-2 text-left text-lg font-semibold rounded-xl cursor-pointer"
          onClick={() => {
            navigate("/admin/complaints");
          }}
        >
          <FileExclamationPoint size={30} />
          <h3>Complaints</h3>
        </button>
        <button
          className="flex gap-3 items-center hover:bg-[#faa005] hover:text-black 
  focus:bg-[#faa005] focus:text-black px-4 py-2 text-left text-lg font-semibold rounded-xl cursor-pointer"
          onClick={() => {
            navigate("/admin/departments");
          }}
        >
          <Building2 size={30} />
          <h3>Department Management</h3>
        </button>

        <button
          className="flex gap-3 items-center hover:bg-[#faa005] hover:text-black 
  focus:bg-[#faa005] focus:text-black px-4 py-2 text-left text-lg font-semibold rounded-xl cursor-pointer"
          onClick={() => {
            navigate("/admin/settings");
          }}
        >
          <Settings size={30} />
          <h3>Settings</h3>
        </button>
        <hr className="w-full my-2  border-[#5d6d8a]" />

        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminSidebar;
