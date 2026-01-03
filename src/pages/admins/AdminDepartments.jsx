import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search } from "lucide-react";
import axios from "axios";
import { notify } from "../../utils/notify";
import { AdminDataContext } from "../../context/AdminContext";
import AdminSidebar from "../../components/admins/layout/AdminSidebar";
import SearchBar from "../../components/admins/layout/SearchBar";
import DepartmentCard from "../../components/ui/cards/DepartmentCard";
import AddDepartmentModal from "../../components/admins/departments/AddDepartmentForm";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminDepartments() {
  const { errorStatus, setErrorStatus, errorMsg, setErrorMsg } =
    useContext(AdminDataContext);

  const adminName = JSON.parse(localStorage.getItem("adminName"));
  const [isLoading, setIsLoading] = useState(false);
  const [deparmentList, setDeparmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [refreshKey, setRefreshKey] = useState(false);
  const [search, setSearch] = useState("");

  const searchData = deparmentList.filter(
    (curData) =>
      curData.name?.toLowerCase().includes(search.toLowerCase()) ||
      curData.description?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function fetchDepartments() {
      try {
        setIsLoading(true);
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/admin/departments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDeparmentList(response.data.departmentList);
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

    fetchDepartments();
  }, [refreshKey]);

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

        {/* ================= HEADER ================= */}
        <div className="px-6 py-3 mt-2">
          <h2 className="text-3xl font-bold">Department Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Oversee and manage government departments.
          </h4>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="min-h-screen w-full bg-gray-100 p-6">
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 h-[90vh] shadow-sm relative overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A]">
                All Departments
              </h1>

              <button
                className="bg-[#2b53a2] px-4 py-2 text-md text-white font-semibold rounded-xl flex gap-2 hover:bg-[#244a91] transition"
                onClick={() =>
                  document.getElementById("add_department_modal").showModal()
                }
              >
                <Building2 size={26} />
                Add Department
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="bg-white p-3 rounded-xl flex items-center shadow-sm">
                <Search className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search departments"
                  value={search}
                  className="w-full outline-none text-sm"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* ================= DEPARTMENT GRID ================= */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {searchData.map((ele, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <DepartmentCard
                    selected={setSelectedDepartment}
                    department={ele}
                    refresh={setRefreshKey}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <AddDepartmentModal refresh={setRefreshKey} />
      </motion.div>
    </div>
  );
}

export default AdminDepartments;
