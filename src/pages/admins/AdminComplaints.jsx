import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";
import { useContext, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleEllipsis,
  Ellipsis,
  FileCheck,
  FileClock,
  FileText,
  FileX,
  Search,
} from "lucide-react";
import AdminStatCard from "../../components/cards/AdminStatCard";
import axios from "axios";
import { AdminDataContext } from "../../context/AdminContext";
import { formatDateIST } from "../../utils/formatTime";
import ComplaintActionModal from "../../components/modals/ComplaintActionModal";
import UpdateStatusModal from "../../components/modals/UpdateStatusModal";
import { useLocation } from "react-router-dom";
import ViewComplaintModal from "../../components/modals/ViewComplaintModal";
import DeleteComplaintModal from "../../components/modals/DeleteComplaint";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminComplaints() {
  const location = useLocation();
  const { errorStatus, setErrorStatus, errorMsg, setErrorMsg } =
    useContext(AdminDataContext);
  const [search, setSearch] = useState("");
  const [countInProgress, setCountInProgress] = useState(0);
  const [countResolved, setCountResolved] = useState(0);
  const [countRejected, setCountRejected] = useState(0);
  const [totalComplaints, seTotalComplaints] = useState(0);
  const [complaintsList, setcomplaintsList] = useState([]);
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
      title: "In-Progress",
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

  const visibleData = complaintsList.slice(startIndex, endIndex);

  const searchData = visibleData.filter(
    (curData) =>
      curData.uniqueToken?.toLowerCase().includes(search.toLowerCase()) ||
      curData.title?.toLowerCase().includes(search.toLowerCase()) ||
      curData.departmentName?.toLowerCase().includes(search.toLowerCase()) ||
      curData.status?.toLowerCase().includes(search.toLowerCase())
  );
  //refactoring
  useEffect(() => {
    async function fetchComplaintsInfo() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/complaints`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.complaints);
        setIsLoading(false);
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
      } catch (error) {
        // console.log(error);
        // 🔴 NETWORK ERROR (backend unreachable)
        if (!error.response) {
          notify("Server is Unreachable. Please try again later.", "error");
          setErrorStatus(500);
          setErrorMsg("Server is unreachable");
          return;
        }
        if (error.response?.status === 401) {
          // console.log(error);
          setErrorStatus(error.response.status);
          setErrorMsg(error.response.data);
          // console.log(errorStatus);
        } else {
          // console.log(error);F
          setErrorStatus(error.response.status);
          setErrorMsg(error.response.data);
        }
      }
    }

    fetchComplaintsInfo();
    // console.log(totalComplaints,countFiled,countInProgress,countResolved,countRejected);
  }, [location.pathname]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
  }

  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar name={adminName} />
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
                        count={ele.count}
                      />
                    );
                  })}
                </div>

                {/* Recent Complaints Table */}
                <div className="bg-white rounded-xl p-4 sm:p-6 min-h-[40vh] shadow-sm relative overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A]">
                      All Complaints
                    </h1>
                  </div>

                  {/* Search Bar */}
                  <div className="mb-6 flex gap-2">
                    <div className="bg-white p-3 rounded-xl flex items-center shadow-sm w-[60vw]">
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
                    <div className="bg-white p-3 rounded-xl flex gap-2 items-center justify-between text-center shadow-sm">
                      <div
                        style={{ opacity: currIndex === 1 ? 0.5 : 1 }}
                        onClick={() => {
                          if (currIndex > 1) {
                            setCurrIndex((prev) => prev - 1);
                          }
                        }}
                      >
                        <ChevronLeft size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{currIndex}</h2>
                      </div>
                      <div
                        onClick={() => {
                          setCurrIndex((prev) => prev + 1);
                        }}
                      >
                        <ChevronRight size={28} />
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="max-w-[80vw] sm:min-w-[700px] w-full text-sm text-center">
                      <thead>
                        <tr className="text-gray-500 text-lg whitespace-nowrap border-b">
                          <th className="py-3 font-medium">Complaint ID</th>
                          <th className="py-3 font-medium">Title</th>
                          <th className="py-3 font-medium">Department</th>
                          <th className="py-3 font-medium">Registered At</th>
                          <th className="py-3 font-medium">Status</th>
                          <th className="py-3 font-medium">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {searchData.map((item, i) => (
                          <tr
                            key={i}
                            className="border-b text-gray-700 whitespace-nowrap hover:bg-gray-50 transition"
                          >
                            <td className="py-3 max-w-[15vw] truncate">
                              {item.uniqueToken}
                            </td>

                            <td className="py-3 max-w-[15vw] truncate">
                              {item.title}
                            </td>

                            <td className="py-3 max-w-[15vw] truncate">
                              {item.departmentName}
                            </td>

                            <td className="py-3 max-w-[15vw] truncate">
                              {formatDateIST(item.createdAt)}
                            </td>

                            <td className="py-3">
                              <div className="flex justify-center">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${colorInfo[item.status]}`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </td>

                            <td className="py-3">
                              <div
                                className="flex justify-center"
                                onClick={() => {
                                  setSelectedComplaint(item);
                                }}
                              >
                                <ComplaintActionModal info={item._id} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <UpdateStatusModal info={selectedComplaint} />
                <ViewComplaintModal info={selectedComplaint} />
                <DeleteComplaintModal info={selectedComplaint} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaints;
