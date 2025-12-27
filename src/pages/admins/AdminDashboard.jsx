import { useEffect, useState } from "react";
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
import Search from "../../components/SearchBar";
import SearchBar from "../../components/SearchBar";
import AdminStatCard from "../../components/cards/AdminStatCard";
import PieChart from "../../components/charts/PieChart";
import Bargraph from "../../components/charts/Bargraph";

function AdminDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
  const complaintStats = {
    filed: 56,
    inProgress: 22,
    resolved: 31,
    rejected: 9,
  };
  const departmentStats = {
    departments: ["Roads", "Water", "Electricity", "Sanitation"],
    filed: [45, 32, 28, 19],
    resolved: [30, 21, 20, 15],
  };

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     try {
  //       const token = JSON.parse(localStorage.getItem("token"));
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_LOCAL_URL}/user/profile`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // console.log(response.data);
  //       setName(response.data.name);
  //       setEmail(response.data.email);
  //       setUniqueToken(response.data.uniqueToken);
  //       setPhone(response.data.phone);
  //       setAddress(response.data.address);
  //       setId(response.data.id);
  //       // console.log(id);
  //     } catch (error) {
  //       // console.log(error);
  //       // 🔴 NETWORK ERROR (backend unreachable)
  //       if (!error.response) {
  //         notify("Server is Unreachable. Please try again later.", "error");
  //         setErrorStatus(500);
  //         setErrorMsg("Server is unreachable");
  //         return;
  //       }
  //       if (error.response?.status === 401) {
  //         // console.log(error);
  //         setErrorStatus(error.response.status);
  //         setErrorMsg(error.response.data);
  //         // console.log(errorStatus);
  //       } else {
  //         // console.log(error);
  //         setErrorStatus(error.response.status);
  //         setErrorMsg(error.response.data);
  //       }
  //     }
  //   }
  //   fetchUserInfo();
  // }, []);
  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar />
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
