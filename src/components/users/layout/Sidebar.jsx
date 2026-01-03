import { useNavigate } from "react-router-dom";
import { House, FileText, FilePlusCorner, User, LogOut } from "lucide-react";
import LogoutButton from "../../ui/buttons/LogoutButton";
import DeleteButton from "../../ui/buttons/DeleteButton";

function Sidebar({ email, uniqueToken }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#ECFDF5] sm:flex flex-col h-screen hidden sm:w-60 left-0 top-0 p-4  border-r-2 border-[#7a9e8e]">
      <div className="flex flex-col gap-3 overflow-y-auto h-[83vh] scrollbar-hide">
        <div
          className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
          onClick={(e) => {
            navigate("/user/dashboard");
          }}
        >
          <House size={28} absoluteStrokeWidth />
          <h2>Home</h2>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
          onClick={(e) => {
            navigate("/user/profile/complaints");
          }}
        >
          <FileText size={28} absoluteStrokeWidth />
          <h2>My Complaints</h2>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
          onClick={(e) => {
            navigate("/user/profile/complaints/Register");
          }}
        >
          <FilePlusCorner size={28} absoluteStrokeWidth />
          <h2>Raise Complaint</h2>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]"
          onClick={() => {
            navigate("/user/profile");
          }}
        >
          <User size={28} absoluteStrokeWidth />
          <h2>My Profile</h2>
        </div>
        <div className="bg-[#D1FAE5] p-4 rounded-2xl  hover:scale-105 hover:bg-[#A7F3D0] ">
          <div className="text-gray-900 font-semibold text-lg">
            Logged in as:
          </div>
          <div className="text-gray-700 text-sm">{email}</div>
          <div className="text-gray-700 text-xs mt-1">{`ID: ${uniqueToken}`}</div>
        </div>
        <LogoutButton />
        <DeleteButton />
      </div>
    </div>
  );
}

export default Sidebar;
