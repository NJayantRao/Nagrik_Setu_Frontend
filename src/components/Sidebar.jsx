import { House,FileText,FilePlusCorner, User,LogOut } from "lucide-react"

function Sidebar(){

    return(
        <div className="bg-[#ECFDF5] flex flex-col h-screen w-60 left-0 top-0 p-4  border-r-2 border-[#7a9e8e]">
           <div className="flex flex-col gap-3 overflow-y-auto h-[83vh] scrollbar-hide">
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
                <House size={28} absoluteStrokeWidth />
                <h2>Home</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
                <FileText size={28} absoluteStrokeWidth />
                <h2>My Complaints</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
                <FilePlusCorner size={28} absoluteStrokeWidth />
                <h2>Raise Complaint</h2>
                </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 font-bold bg-[#D1FAE5] rounded-2xl transition cursor-pointer hover:scale-105 hover:bg-[#A7F3D0]">
                <User size={28} absoluteStrokeWidth />
                <h2>My Profile</h2>
                </div>
                  <div className="bg-[#D1FAE5] p-4 rounded-2xl  hover:scale-105 hover:bg-[#A7F3D0] ">
        <div className="text-gray-900 font-semibold text-lg">Logged in as:</div>
        <div className="text-gray-700 text-sm">harry@gmail.com</div>
        <div className="text-gray-500 text-xs mt-1">ID:ldf-dfss-8878744333</div>
        </div>

        <div className="bg-[#D1FAE5] flex justify-center items-center p-2 hover:scale-105 hover:bg-[#A7F3D0] rounded-xl">
        <div className="flex items-center gap-2 text-red-600 cursor-pointer font-medium hover:text-red-700 hover:underline">
          <LogOut size={18} />
          Logout
        </div>
           </div>
        </div>
        </div>
    )
}

export default Sidebar