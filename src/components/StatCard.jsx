import { Search, Bell, User, FileText, FileClock, FileCheck, FileX } from "lucide-react";

function StatCard(){
    return(
        <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold p-1">Total Complaints</p>
              <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">0</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>
    )
}

export default StatCard