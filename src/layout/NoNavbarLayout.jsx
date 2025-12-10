import { Outlet } from "react-router-dom";

function NoNavbarLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default NoNavbarLayout;
