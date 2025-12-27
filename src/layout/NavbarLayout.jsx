import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function NavbarLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavbarLayout;
