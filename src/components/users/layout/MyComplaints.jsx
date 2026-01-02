import { useEffect, useState } from "react";
import {
  Search,
  FileText,
  FileClock,
  FileCheck,
  FileX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DeleteModal from "../../modals/DeleteModal";
import { formatDateIST } from "../../../utils/formatTime";

function MyComplaints({
  filed,
  inProgress,
  resolved,
  rejected,
  complaints,
  currIndex,
  setCurrIndex,
}) {
  // console.log(complaints);
  const [search, setSearch] = useState("");
  const rowsPerPage = 3;
  const startIndex = (currIndex - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  useEffect(() => {
    // console.log("current idx is",currIndex);
  }, [currIndex]);

  const colorInfo = {
    Filed: "bg-blue-100 text-blue-700 border border-blue-200",
    Acknowledged: "bg-indigo-100 text-indigo-700 border border-indigo-200",
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
  const visiblePages = searchData.slice(startIndex, endIndex);
  const totalpages = Math.ceil(searchData.length / rowsPerPage);
  useEffect(() => {
    setCurrIndex(1);
  }, [search]);
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 ">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-3xl font-semibold text-[#1E3A8A]">
          My Complaints
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3">
        <div className="bg-white p-3 rounded-xl flex items-center shadow-sm w-full sm:w-[70vw]">
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
        <div className="bg-white p-3 rounded-xl sm:flex gap-2 items-center shadow-sm hidden">
          <ChevronLeft
            className={`cursor-pointer ${currIndex === 1 ? "opacity-40" : ""}`}
            size={26}
            onClick={() => currIndex > 1 && setCurrIndex((p) => p - 1)}
          />
          <span className="text-xl font-bold">{currIndex}</span>
          <ChevronRight
            className={`cursor-pointer ${
              currIndex === totalpages ? "opacity-40" : ""
            }`}
            size={26}
            onClick={() => currIndex < totalpages && setCurrIndex((p) => p + 1)}
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

          {/* ===================== MOBILE CARDS ===================== */}
          <div className="sm:hidden space-y-4 max-h-[75vh] overflow-y-auto pb-20">
            {visiblePages.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-md space-y-3 border border-gray-100 transition hover:shadow-lg"
              >
                {/* Top row */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xs text-gray-600 tracking-wide">
                    {item.uniqueToken}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold ${colorInfo[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <p className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2">
                  {item.title}
                </p>

                {/* Department */}
                <p className="text-xs text-gray-500">{item.departmentName}</p>

                {/* Date */}
                <p className="text-[11px] text-gray-400">
                  {formatDateIST(item.createdAt)}
                </p>

                {/* CTA */}
                <button className="w-full mt-2 bg-blue-50 text-blue-700 py-2 rounded-xl text-sm font-semibold hover:bg-blue-100 transition">
                  View Complaint
                </button>
              </div>
            ))}

            {/* ===================== PAGINATION ===================== */}
            <div className="sticky flex justify-center">
              <div
                className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-full 
                    flex items-center gap-6 shadow-lg border border-gray-200"
              >
                <ChevronLeft
                  size={22}
                  className={`transition ${
                    currIndex === 1
                      ? "text-gray-300"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => currIndex > 1 && setCurrIndex((p) => p - 1)}
                />

                <span className="text-sm font-semibold text-gray-700">
                  Page{" "}
                  <span className="text-blue-600 font-bold">{currIndex}</span>
                </span>

                <ChevronRight
                  size={22}
                  className={` transition ${
                    currIndex < totalpages
                      ? "text-gray-300"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() =>
                    currIndex < totalpages && setCurrIndex((p) => p + 1)
                  }
                />
              </div>
            </div>
          </div>

          {/* Recent Complaints Table */}
          <div className="bg-white rounded-xl p-4 hidden sm:block sm:p-6 max-h-[40vh] shadow-sm relative overflow-y-auto">
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
                    <th className="pb-3 font-semibold text-lg ">
                      Registered At
                    </th>
                    <th className="pb-3 font-semibold text-lg ">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {visiblePages.map((item, i) => (
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
                        <span
                          className={`px-3 py-1 rounded-full inline-block text-xs font-medium`}
                        >
                          {formatDateIST(item.createdAt)}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs hover:bg-blue-200 transition cursor-pointer">
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
