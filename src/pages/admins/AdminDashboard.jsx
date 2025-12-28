import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import {
  Eye,
  EyeOff,
  FileCheck,
  FileClock,
  FileText,
  FileX,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";
import AdminStatCard from "../../components/cards/AdminStatCard";
import PieChart from "../../components/charts/PieChart";
import Bargraph from "../../components/charts/Bargraph";
import { AdminDataContext } from "../../context/AdminContext";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminDashboard() {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
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

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setAdminName(response.data.name);
        setIsLoading(false);
        localStorage.setItem("adminName", JSON.stringify(adminName));
      } catch (error) {
        setIsLoading(false);
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
          // console.log(error);
          setErrorStatus(error.response.status);
          setErrorMsg(error.response.data);
        }
      }
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function fetchComplaintsInfo() {
      try {
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
        let f = 0,
          ip = 0,
          r = 0,
          rej = 0;

        response.data.complaints.forEach((ele) => {
          if (ele.status === "Filed" || ele.status === "Acknowledged") f++;
          else if (ele.status === "In-Progress") ip++;
          else if (ele.status === "Resolved") r++;
          else if (ele.status === "Rejected") rej++;
        });

        setCountFiled(f);
        setCountInProgress(ip);
        setCountResolved(r);
        setCountRejected(rej);
        seTotalComplaints(response.data.complaints.length);
        setcomplaintsList(response.data.complaints);
      } catch (error) {
        // console.log(error);
        setErrorMsg(error.response.data);
        setErrorStatus(error.response.status);
      }
    }

    fetchComplaintsInfo();
    // console.log(totalComplaints,countFiled,countInProgress,countResolved,countRejected);
  }, []);

  useEffect(() => {
    async function fetchDepartmentInfo() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/departments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
      } catch (error) {
        setErrorMsg(error.response.data);
        setErrorStatus(error.response.status);
      }
    }

    fetchDepartmentInfo();
  }, []);
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
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Welcome back! Here's an overview of your system.
          </h4>
          <div className="sm:grid grid-cols-4 gap-4 hidden my-3">
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
          <div className="px-4 py-2 bg-white rounded-xl shadow-lg flex justify-evenly gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
