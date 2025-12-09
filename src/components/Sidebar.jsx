import axios from "axios"
import { House,FileText,FilePlusCorner, User,LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({email,uniqueToken}){
    const navigate= useNavigate()

    const notify = (message, type = "success") => {
      const colors = {
        success: "#4f46e5", // Indigo (your success color)
        error: "#dc2626",   // Red-600
        info: "#2563eb",    // Blue-600
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

    return(
        <div className="bg-[#ECFDF5] flex flex-col h-screen w-60 left-0 top-0 p-4  border-r-2 border-[#7a9e8e]">
           <div className="flex flex-col gap-3 overflow-y-auto h-[83vh] scrollbar-hide">
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]" onClick={(e)=>{
              navigate("/user/profile")
            }}>
                <House size={28} absoluteStrokeWidth />
                <h2>Home</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]" onClick={(e)=>{
              navigate("/user/profile/complaints")
            }}>
                <FileText size={28} absoluteStrokeWidth />
                <h2>My Complaints</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]" onClick={(e)=>{
              navigate("/user/profile/complaints/Register")
            }}>
                <FilePlusCorner size={28} absoluteStrokeWidth />
                <h2>Raise Complaint</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
                <User size={28} absoluteStrokeWidth />
                <h2>My Profile</h2>
                </div>
                  <div className="bg-[#D1FAE5] p-4 rounded-2xl  hover:scale-105 hover:bg-[#A7F3D0] ">
        <div className="text-gray-900 font-semibold text-lg">Logged in as:</div>
        <div className="text-gray-700 text-sm">{email}</div>
        <div className="text-gray-700 text-xs mt-1">{`ID: ${uniqueToken}`}</div>
        </div>

        <div className="bg-[#D1FAE5] flex justify-center items-center p-2 hover:scale-105 hover:bg-[#A7F3D0] rounded-xl">
        <div className="flex items-center gap-2 text-red-600 cursor-pointer font-medium hover:text-red-700 hover:underline" onClick={async (e)=>{
            try {
                const token= JSON.parse(localStorage.getItem("token"))
                const response= await axios.get(`${import.meta.env.VITE_LOCAL_URL}/user/logout`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response);
                notify(response.data,"success")
                navigate("/")
            } catch (error) {
                console.log(error); 
            }
        }}>
          <LogOut size={18} />
          Logout
        </div>
           </div>
        </div>
        </div>
    )
}

export default Sidebar