import { useContext, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileCheck,
  FileClock,
  FileText,
  FileX,
  Search,
} from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

import AdminSidebar from "../../components/admins/layout/AdminSidebar";
import SearchBar from "../../components/admins/layout/SearchBar";
import AdminStatCard from "../../components/ui/cards/AdminStatCard";
import { AdminDataContext } from "../../context/AdminContext";
import { formatDateIST } from "../../utils/formatTime";
import ComplaintActionModal from "../../components/modals/ComplaintActionModal";
import UpdateStatusModal from "../../components/modals/UpdateStatusModal";
import ViewComplaintModal from "../../components/modals/ViewComplaintModal";
import DeleteComplaintModal from "../../components/modals/DeleteComplaint";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminComplaints() {
  const { errorStatus, setErrorStatus, errorMsg, setErrorMsg } =
    useContext(AdminDataContext);

  const [search, setSearch] = useState("");
  const [countInProgress, setCountInProgress] = useState(0);
  const [countResolved, setCountResolved] = useState(0);
  const [countRejected, setCountRejected] = useState(0);
  const [totalComplaints, seTotalComplaints] = useState(0);
  const [complaintsList, setcomplaintsList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [currIndex, setCurrIndex] = useState(1);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const rowsPerPage = 10;
  const startIndex = (currIndex - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const adminName = JSON.parse(localStorage.getItem("adminName"));
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
      count: totalComplaints,
    },
    {
      title: "Pending",
      icon: FileClock,
      bgColor: "bg-[#fef5e6]",
      textColor: "text-[#f9a006]",
      count: countInProgress,
    },
    {
      title: "Resolved",
      icon: FileCheck,
      bgColor: "bg-[#e8f9ef]",
      textColor: "text-[#16a34a]",
      count: countResolved,
    },
    {
      title: "Rejected",
      icon: FileX,
      bgColor: "bg-[#fff0f0]",
      textColor: "text-red-600",
      count: countRejected,
    },
  ];

  const searchData = complaintsList.filter(
    (curData) =>
      curData.uniqueToken?.toLowerCase().includes(search.toLowerCase()) ||
      curData.title?.toLowerCase().includes(search.toLowerCase()) ||
      curData.departmentName?.toLowerCase().includes(search.toLowerCase()) ||
      curData.status?.toLowerCase().includes(search.toLowerCase())
  );
  const visibleData = searchData.slice(startIndex, endIndex);
  const totalpages = Math.ceil(searchData.length / rowsPerPage);
  /* ================= FETCH COMPLAINTS ================= */
  useEffect(() => {
    async function fetchComplaintsInfo() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/complaints`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let ip = 0,
          r = 0,
          rej = 0;

        response.data.complaints.forEach((ele) => {
          if (
            ele.status === "Filed" ||
            ele.status === "In-Progress" ||
            ele.status === "Acknowledged"
          )
            ip++;
          else if (ele.status === "Resolved") r++;
          else if (ele.status === "Rejected") rej++;
        });

        setCountInProgress(ip);
        setCountResolved(r);
        setCountRejected(rej);
        seTotalComplaints(response.data.complaints.length);
        setcomplaintsList(response.data.complaints);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (!error.response) {
          notify("Server is Unreachable. Please try again later.", "error");
          setErrorStatus(500);
          setErrorMsg("Server is unreachable");
          return;
        }
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }

    fetchComplaintsInfo();
  }, [refreshKey]);

  useEffect(() => {
    setCurrIndex(1);
  }, [search]);

  if (isLoading) return <Loader />;
  if (errorStatus === 401 || errorStatus === 500)
    return <Errors status={errorStatus} message={errorMsg} />;

  return (
    <div className="flex bg-[#f9fafb] min-h-screen">
      <AdminSidebar />

      {/* ================= MAIN CONTENT ================= */}
      <motion.div
        className="w-4/5 shadow-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SearchBar name={adminName} />

        <div className="px-6 py-3 mt-2">
          <h2 className="text-3xl font-bold">Complaint Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            View, manage and resolve citizens’ complaints.
          </h4>

          {/* ================= STATS ================= */}
          <motion.div
            className="sm:grid grid-cols-4 gap-4 hidden my-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {statCardInfo.map((ele, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <AdminStatCard {...ele} />
              </motion.div>
            ))}
          </motion.div>

          {/* ================= TABLE ================= */}
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 min-h-[40vh] shadow-sm relative overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mb-4">
              All Complaints
            </h1>

            {/* Search + Pagination */}
            <div className="mb-6 flex gap-2">
              <div className="bg-white p-3 rounded-xl flex items-center shadow-sm w-[60vw]">
                <Search className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search complaints"
                  className="w-full outline-none text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="bg-white p-3 rounded-xl flex gap-2 items-center shadow-sm">
                <ChevronLeft
                  className={`cursor-pointer ${
                    currIndex === 1 ? "opacity-50" : ""
                  }`}
                  size={26}
                  onClick={() => currIndex > 1 && setCurrIndex((p) => p - 1)}
                />
                <span className="text-xl font-bold">{currIndex}</span>
                <ChevronRight
                  className={`cursor-pointer ${
                    currIndex === totalpages ? "opacity-50" : ""
                  }`}
                  size={26}
                  onClick={() =>
                    currIndex < totalpages && setCurrIndex((p) => p + 1)
                  }
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="max-w-[80vw] sm:min-w-[700px] w-full text-sm text-center">
                <thead>
                  <tr className="text-gray-500 text-lg border-b">
                    <th className="py-3">Complaint ID</th>
                    <th className="py-3">Title</th>
                    <th className="py-3">Department</th>
                    <th className="py-3">Registered At</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 truncate max-w-[15vw]">
                        {item.uniqueToken}
                      </td>
                      <td className="py-3 truncate max-w-[15vw]">
                        {item.title}
                      </td>
                      <td className="py-3 truncate max-w-[15vw]">
                        {item.departmentName}
                      </td>
                      <td className="py-3">{formatDateIST(item.createdAt)}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${colorInfo[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div
                          className="flex justify-center"
                          onClick={() => setSelectedComplaint(item)}
                        >
                          <ComplaintActionModal info={item._id} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* ================= MODALS ================= */}
        <UpdateStatusModal info={selectedComplaint} refresh={setRefreshKey} />
        <ViewComplaintModal info={selectedComplaint} />
        <DeleteComplaintModal
          info={selectedComplaint}
          refresh={setRefreshKey}
        />
      </motion.div>
    </div>
  );
}

export default AdminComplaints;
