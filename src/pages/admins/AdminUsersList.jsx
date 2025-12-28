import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";
import { FileCheck, FileClock, FileText, FileX, Search } from "lucide-react";
import AdminStatCard from "../../components/cards/AdminStatCard";
import { AdminDataContext } from "../../context/AdminContext";
import { useContext } from "react";
import UserCard from "../../components/cards/UserCard";
import DepartmentCard from "../../components/cards/DepartmentCard";

function AdminUsersList() {
  const { adminName } = useContext(AdminDataContext);
  const departments = [
    {
      name: "Public Works Department",
      deptId: "DEP-001",
      staffCount: 42,
      totalComplaints: 128,
      pendingComplaints: 23,
      active: true,
    },
    {
      name: "Water Supply",
      deptId: "DEP-002",
      staffCount: 30,
      totalComplaints: 86,
      pendingComplaints: 12,
      active: true,
    },
    {
      name: "Electricity Board",
      deptId: "DEP-003",
      staffCount: 25,
      totalComplaints: 64,
      pendingComplaints: 18,
      active: false,
    },
  ];
  const users = [
    {
      initials: "RK",
      name: "Rajesh Kumar",
      userId: "USR-001",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      address: "Sector 21, Delhi",
      status: "active",
      complaints: 5,
      verified: true,
    },
    {
      initials: "PS",
      name: "Priya Sharma",
      userId: "USR-002",
      email: "priya.sharma@email.com",
      phone: "+91 98765 32109",
      address: "Block A, Noida",
      status: "active",
      complaints: 3,
      verified: true,
    },
  ];
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

  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar name={adminName} />
        <div className="px-6 py-3 mt-2">
          <h2 className="text-3xl font-bold">User Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Manage Registered Citizens Accounts.
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
                    All Users
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
                      // value={search}
                      onChange={(e) => {
                        //   setSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="grid">
                  <div className="overflow-x-auto grid grid-cols-3 gap-2">
                    {departments.map((ele, idx) => {
                      return <DepartmentCard key={idx} department={ele} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersList;
