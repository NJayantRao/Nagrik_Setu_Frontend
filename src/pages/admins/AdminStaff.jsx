import AdminSidebar from "../../components/sidebars/AdminSidebar";
import SearchBar from "../../components/SearchBar";

function AdminStaff() {
  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar />
        <div className="px-6 py-3 mt-2">
          <h2 className="text-3xl font-bold">Staff Management</h2>
          <h4 className="text-lg font-medium text-[#706e7d]">
            Manage Staff and their Assignments.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AdminStaff;
