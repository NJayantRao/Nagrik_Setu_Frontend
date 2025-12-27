import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebars/AdminSidebar";

function AdminPagesLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default AdminPagesLayout;
