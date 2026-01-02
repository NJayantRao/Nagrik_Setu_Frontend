import { useState } from "react";
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

function MyComplaints({ filed, inProgress, resolved, rejected, complaints }) {
  // console.log(complaints);
  const [search, setSearch] = useState("");
  const [currIndex, setCurrIndex] = useState(1);
  const colorInfo = {
    Filed: "bg-blue-100 text-blue-700 border border-blue-200",
    Acknowledged: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    "In-Progress": "bg-amber-100 text-amber-700 border border-amber-200",
    Resolved: "bg-green-100 text-green-700 border border-green-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };
  const dummyComplaints = [
    {
      uniqueToken: "CIV-DELH-10293847",
      status: "Filed",
      title: "Overflowing garbage near main road",
      departmentName: "Municipal Corporation",
      createdAt: "2025-01-01T10:15:00Z",
    },
    {
      uniqueToken: "CIV-MUMB-29384756",
      status: "Acknowledged",
      title: "Street light not working for 3 days",
      departmentName: "Electricity Department",
      createdAt: "2025-01-02T08:40:00Z",
    },
    {
      uniqueToken: "CIV-BENG-84736251",
      status: "In-Progress",
      title: "Water leakage from underground pipeline",
      departmentName: "Water Supply Department",
      createdAt: "2025-01-03T12:10:00Z",
    },
    {
      uniqueToken: "CIV-CHEN-56473829",
      status: "Resolved",
      title: "Potholes causing traffic congestion",
      departmentName: "Public Works Department",
      createdAt: "2025-01-04T09:25:00Z",
    },
    {
      uniqueToken: "CIV-HYDR-91827364",
      status: "Rejected",
      title: "Illegal parking blocking residential entry",
      departmentName: "Traffic Police",
      createdAt: "2025-01-05T14:50:00Z",
    },
    {
      uniqueToken: "CIV-PUNE-73645281",
      status: "Filed",
      title: "Open drain creating foul smell",
      departmentName: "Health & Sanitation",
      createdAt: "2025-01-06T11:30:00Z",
    },
    {
      uniqueToken: "CIV-JAIP-38475629",
      status: "Acknowledged",
      title: "Damaged footpath near bus stop",
      departmentName: "Urban Development Authority",
      createdAt: "2025-01-07T16:05:00Z",
    },
    {
      uniqueToken: "CIV-LUCK-56483920",
      status: "In-Progress",
      title: "Low water pressure in residential area",
      departmentName: "Water Supply Department",
      createdAt: "2025-01-08T07:55:00Z",
    },
    {
      uniqueToken: "CIV-NOIDA-82736491",
      status: "Resolved",
      title: "Broken park bench posing safety risk",
      departmentName: "Parks & Recreation",
      createdAt: "2025-01-09T18:20:00Z",
    },
    {
      uniqueToken: "CIV-INDB-19283746",
      status: "Filed",
      title: "Stray dogs creating disturbance at night",
      departmentName: "Animal Control Department",
      createdAt: "2025-01-10T21:10:00Z",
    },
  ];

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

          {/* ===================== MOBILE CARDS ===================== */}
          <div className="sm:hidden space-y-4 max-h-[75vh] overflow-y-auto pb-20">
            {dummyComplaints.slice(0, 3).map((item, i) => (
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
                  className="text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setCurrIndex((p) => p + 1)}
                />
              </div>
            </div>
          </div>

          {/* Recent Complaints Table */}
          <div className="bg-white rounded-xl p-4 hidden sm:block sm:p-6 h-[40vh] shadow-sm relative overflow-y-auto">
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
