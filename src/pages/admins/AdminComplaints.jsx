import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import { FileCheck, FileClock, FileText, FileX, Search } from "lucide-react";
import AdminStatCard from "../../components/cards/AdminStatCard";

function AdminComplaints() {
  const [search, setSearch] = useState("");
  const colorInfo = {
    Filed: "bg-blue-100 text-blue-700 border border-blue-200",
    "In-Progress": "bg-amber-100 text-amber-700 border border-amber-200",
    Resolved: "bg-green-100 text-green-700 border border-green-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };
  const statCardInfo = [
    {
      title: "Total Complaints",
      icon: FileText,
      bgColor: "bg-[#e8eaef]",
      textColor: "text-[#193366]",
    },
    {
      title: "In-Progress",
      icon: FileClock,
      bgColor: "bg-[#fef5e6]",
      textColor: "text-[#f9a006]",
    },
    {
      title: "Resolved",
      icon: FileCheck,
      bgColor: "bg-[#e8f9ef]",
      textColor: "text-[#16a34a]",
    },
    {
      title: "Rejected",
      icon: FileX,
      bgColor: "bg-[#fff0f0]",
      textColor: "text-red-600",
    },
  ];

  //   const searchData = complaints.filter(
  //     (curData) =>
  //       curData.title.toLowerCase().includes(search.toLowerCase()) ||
  //       curData.uniqueToken.toLowerCase().includes(search.toLowerCase()) ||
  //       curData.departmentName.toLowerCase().includes(search.toLowerCase()) ||
  //       curData.status.toLowerCase().includes(search.toLowerCase())
  //   );
  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar />
        <div className="px-6 py-3 mt-2">
          <h2 className="text-3xl font-bold">Complaint Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            View, Manage and Resolve Citizens complaints.
          </h4>
        </div>
        <div>
          <div className="min-h-screen w-full bg-gray-100 p-6 ">
            {/* Top Navigation */}

            {/* Main Grid */}
            <div className="grid gap-6">
              {/* LEFT SIDE */}
              <div className="col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="sm:grid grid-cols-4 gap-4 hidden ">
                  {statCardInfo.map((ele, idx) => {
                    return (
                      <AdminStatCard
                        key={idx}
                        bgColor={ele.bgColor}
                        title={ele.title}
                        icon={ele.icon}
                        textColor={ele.textColor}
                      />
                    );
                  })}
                </div>

                {/* Recent Complaints Table */}
                <div className="bg-white rounded-xl p-4 sm:p-6 h-[40vh] shadow-sm relative overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A]">
                      All Complaints
                    </h1>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-6">
                    <div className="bg-white p-3 rounded-xl flex items-center shadow-sm">
                      <Search className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search your complaints"
                        className="w-full outline-none text-sm"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="max-w-[80vw] sm:min-w-[700px] w-full text-sm">
                      <thead>
                        <tr className="text-gray-500 whitespace-nowrap">
                          <th className="text-left pb-3">Complaint ID</th>
                          <th className="text-left pb-3">Title</th>
                          <th className="text-left pb-3">Department</th>
                          <th className="text-left pb-3">Status</th>
                          <th className="text-left pb-3">Actions</th>
                        </tr>
                      </thead>

                      {/* <tbody>
                  {searchData.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t text-gray-700 whitespace-nowrap"
                    >
                      <td className="py-3 truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[15vw]">
                        {item.uniqueToken}
                      </td>

                      <td className=" truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[15vw] ">
                        {item.title}
                      </td>

                      <td className="truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[15vw]">
                        {item.departmentName}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full inline-block text-xs font-medium ${colorInfo[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaints;
