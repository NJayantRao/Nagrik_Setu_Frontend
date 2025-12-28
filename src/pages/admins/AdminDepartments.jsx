import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";
import {
  Building2,
  FileCheck,
  FileClock,
  FileText,
  FileX,
  Search,
} from "lucide-react";
import AdminStatCard from "../../components/cards/AdminStatCard";
import { AdminDataContext } from "../../context/AdminContext";
import { useContext, useEffect, useState } from "react";
import UserCard from "../../components/cards/UserCard";
import DepartmentCard from "../../components/cards/DepartmentCard";
import AddDepartmentModal from "../../components/AddDepartmentForm";
import axios from "axios";
import UpdateDepartmentModal from "../../components/modals/UpdateDepartment";
import DepartmentAction from "../../components/dropdowns/DepartmentAction";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminDepartments() {
  const { errorStatus, setErrorStatus, errorMsg, setErrorMsg } =
    useContext(AdminDataContext);
  const adminName = JSON.parse(localStorage.getItem("adminName"));
  const [isLoading, setIsLoading] = useState(false);
  const [deparmentList, setDeparmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const selected = selectedDepartment;
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const respponse = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/departments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(respponse.data.departmentList);
        setDeparmentList(respponse.data.departmentList);
        setIsLoading(false);
      } catch (error) {
        //eslint-disable-next-line
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
    fetchDepartments();
  }, [refreshKey]);
  // console.log(selectedDepartment);
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
          <h2 className="text-3xl font-bold">Department Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Oversee and Manage Government Departments..
          </h4>
        </div>
        <div className="min-h-screen w-full bg-gray-100 p-6 ">
          {/* Top Navigation */}

          {/* Main Grid */}
          <div className="grid gap-6">
            {/* LEFT SIDE */}
            <div className="col-span-2 space-y-6">
              {/* Recent Complaints Table */}
              <div className="bg-white rounded-xl p-4 sm:p-6 h-[90vh] shadow-sm relative overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A]">
                    All Departments
                  </h1>
                  <button
                    className="bg-[#2b53a2] px-4 py-2 text-md text-white font-semibold rounded-xl flex gap-2 hover:cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById("add_department_modal")
                        .showModal();
                    }}
                  >
                    <Building2 size={28} />
                    Add Department
                  </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="bg-white p-3 rounded-xl flex items-center shadow-sm">
                    <Search className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search your complaints"
                      className="w-full outline-none text-sm"
                      // value={search}
                      onChange={(e) => {
                        //   setSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-3 gap-2">
                  {deparmentList.map((ele, idx) => {
                    return (
                      <DepartmentCard
                        key={idx}
                        selected={setSelectedDepartment}
                        department={ele}
                        refresh={setRefreshKey}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddDepartmentModal refresh={setRefreshKey} />
      </div>
    </div>
  );
}

export default AdminDepartments;
