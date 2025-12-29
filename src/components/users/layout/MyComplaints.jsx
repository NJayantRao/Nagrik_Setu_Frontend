import { useState } from "react";
import { Search, FileText, FileClock, FileCheck, FileX } from "lucide-react";
import DeleteModal from "../../modals/DeleteModal";

function MyComplaints({ filed, inProgress, resolved, rejected, complaints }) {
  // console.log(complaints);
  const [search, setSearch] = useState("");
  const colorInfo = {
    Filed: "bg-blue-100 text-blue-700 border border-blue-200",
    "In-Progress": "bg-amber-100 text-amber-700 border border-amber-200",
    Resolved: "bg-green-100 text-green-700 border border-green-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };

  const searchData = complaints.filter(
    (curData) =>
      curData.title.toLowerCase().includes(search.toLowerCase()) ||
      curData.uniqueToken.toLowerCase().includes(search.toLowerCase()) ||
      curData.departmentName.toLowerCase().includes(search.toLowerCase()) ||
      curData.status.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 ">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-3xl font-semibold text-[#1E3A8A]">
          My Complaints
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

      {/* Main Grid */}
      <div className="grid gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="sm:grid grid-cols-5 gap-4 hidden ">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm sm:text-lg font-semibold p-1">
                Total Complaints
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {complaints.length}
                  </h2>
                </div>
                <FileText size={36} strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Filed</p>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{filed}</h2>
                </div>
                <FileText size={36} strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">In Progress</p>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{inProgress}</h2>
                </div>
                <FileClock size={36} strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Resolved</p>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{resolved}</h2>
                </div>
                <FileCheck size={36} strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Rejected</p>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{rejected}</h2>
                </div>
                <FileX size={36} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Recent Complaints Table */}
          <div className="bg-white rounded-xl p-4 sm:p-6 h-[40vh] shadow-sm relative overflow-y-auto">
            <div className="overflow-x-auto">
              <table className="max-w-[80vw] sm:min-w-[700px] w-full text-sm text-center">
                <thead>
                  <tr className="text-gray-500 whitespace-nowrap border-b">
                    <th className="pb-3 font-semibold text-lg ">
                      Complaint ID
                    </th>
                    <th className="pb-3 font-semibold text-lg ">Title</th>
                    <th className="pb-3 font-semibold text-lg ">Department</th>
                    <th className="pb-3 font-semibold text-lg ">Status</th>
                    <th className="pb-3 font-semibold text-lg ">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {searchData.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t text-gray-700 whitespace-nowrap hover:bg-gray-50 transition"
                    >
                      <td className="py-3 max-w-[15vw] truncate mx-auto">
                        {item.uniqueToken}
                      </td>

                      <td className="py-3 max-w-[15vw] truncate mx-auto">
                        {item.title}
                      </td>

                      <td className="py-3 max-w-[15vw] truncate mx-auto">
                        {item.departmentName}
                      </td>

                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full inline-block text-xs font-medium ${colorInfo[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3">
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs hover:bg-blue-200 transition">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal />
    </div>
  );
}

export default MyComplaints;
