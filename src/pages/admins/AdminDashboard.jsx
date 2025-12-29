import { useContext, useEffect, useState } from "react";
import { FileCheck, FileClock, FileText, FileX } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AdminSidebar from "../../components/admins/layout/AdminSidebar";
import SearchBar from "../../components/admins/layout/SearchBar";
import AdminStatCard from "../../components/ui/cards/AdminStatCard";
import PieChart from "../../components/ui/charts/PieChart";
import Bargraph from "../../components/ui/charts/Bargraph";
import { AdminDataContext } from "../../context/AdminContext";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminDashboard() {
  const navigate = useNavigate();

  const {
    adminName,
    setAdminName,
    errorStatus,
    setErrorStatus,
    errorMsg,
    setErrorMsg,
  } = useContext(AdminDataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [countFiled, setCountFiled] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);
  const [countResolved, setCountResolved] = useState(0);
  const [countRejected, setCountRejected] = useState(0);
  const [totalComplaints, seTotalComplaints] = useState(0);
  const [complaintsList, setcomplaintsList] = useState([]);

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

  const complaintStats = {
    filed: countFiled,
    inProgress: countInProgress,
    resolved: countResolved,
    rejected: countRejected,
  };

  const departmentStats = {
    departments: ["Roads", "Water", "Electricity", "Sanitation"],
    filed: [45, 32, 28, 19],
    resolved: [30, 21, 20, 15],
  };

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdminName(response.data.name);
        setIsLoading(false);
        localStorage.setItem("adminName", JSON.stringify(adminName));
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
    fetchUserInfo();
  }, []);

  /* ================= FETCH COMPLAINTS ================= */
  useEffect(() => {
    async function fetchComplaintsInfo() {
      try {
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
            ele.status === "Acknowledged" ||
            ele.status === "In-Progress"
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
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
    fetchComplaintsInfo();
  }, []);

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
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Welcome back! Here's an overview of your system.
          </h4>

          {/* ================= STATS ================= */}
          <motion.div
            className="sm:grid grid-cols-4 gap-4 hidden my-3"
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
                <AdminStatCard
                  bgColor={ele.bgColor}
                  title={ele.title}
                  icon={ele.icon}
                  textColor={ele.textColor}
                  count={ele.count}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* ================= CHARTS ================= */}
          <motion.div
            className="px-4 py-2 bg-white rounded-xl shadow-lg flex justify-evenly gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold text-[#1E3A8A]">
                Complaint Categories
              </h2>
              <PieChart stats={complaintStats} />
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold text-[#1E3A8A]">
                Department Performance
              </h2>
              <Bargraph data={departmentStats} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
