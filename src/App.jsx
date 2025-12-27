import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NavbarLayout = lazy(() => import("./layout/NavbarLayout"));
const NoNavbarLayout = lazy(() => import("./layout/NoNavbarLayout"));
const Home = lazy(() => import("./pages/common/Home"));
const ErrorPage = lazy(() => import("./pages/common/ErrorPage"));
const UserSignUpPage = lazy(() => import("./pages/users/UserSignUpPage"));
const UserLoginPage = lazy(() => import("./pages/users/UserLoginPage"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const UserForgotPassword = lazy(
  () => import("./pages/users/UserForgotpassword")
);
const UserResetPassword = lazy(() => import("./pages/users/UserResetPassword"));
const UserComplaints = lazy(() => import("./pages/users/UserComplaints"));
const ComplaintsRegister = lazy(
  () => import("./pages/users/ComplaintsRegister")
);
const AdminSignUpPage = lazy(() => import("./pages/admins/AdminSignUpPage"));
const AdminLoginPage = lazy(() => import("./pages/admins/AdminLoginPage"));
const AdminProfile = lazy(() => import("./pages/admins/AdminProfile"));
const AdminForgotPassword = lazy(
  () => import("./pages/admins/AdminForgotPassword")
);
const AdminResetPassword = lazy(
  () => import("./pages/admins/AdminResetPassword")
);

import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/common/Loaders";
import AdminDashboard from "./pages/admins/AdminDashboard";
import AdminComplaints from "./pages/admins/AdminComplaints";
import AdminUsersList from "./pages/admins/AdminUsersList";
import AdminStaff from "./pages/admins/AdminStaff";
import Adminsettings from "./pages/admins/AdminSettings";

function App() {
  const { setIsLoginClicked, isLoginClicked } = useContext(UserDataContext);
  return (
    <div
      className="min-h-screen w-full bg-[#e0e7ff] relative"
      onClick={() => {
        if (isLoginClicked) {
          setIsLoginClicked(!isLoginClicked);
        }
      }}
    >
      {/* Global Settings */}
      <ToastContainer
        position="top-center"
        theme="light"
        newestOnTop
        closeOnClick
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route path="/user/signup" element={<UserSignUpPage />}></Route>
            <Route path="/admin/signup" element={<AdminSignUpPage />}></Route>
            <Route path="/user/login" element={<UserLoginPage />}></Route>
            <Route path="/admin/login" element={<AdminLoginPage />}></Route>
            <Route
              path="/user/forgotPassword"
              element={<UserForgotPassword />}
            ></Route>
            <Route
              path="/admin/forgotPassword"
              element={<AdminForgotPassword />}
            ></Route>
            <Route
              path="/user/resetPassword"
              element={<UserResetPassword />}
            ></Route>
            <Route
              path="/admin/resetPassword"
              element={<AdminResetPassword />}
            ></Route>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<NoNavbarLayout />}>
            <Route path="/user/profile" element={<UserProfile />}></Route>
            <Route
              path="/user/profile/complaints"
              element={<UserComplaints />}
            ></Route>
            <Route
              path="/user/profile/complaints/Register"
              element={<ComplaintsRegister />}
            ></Route>
            <Route path="/admin/profile" element={<AdminProfile />}></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/admin/complaints"
              element={<AdminComplaints />}
            ></Route>
            <Route path="/admin/usersList" element={<AdminUsersList />}></Route>
            <Route path="/admin/staff" element={<AdminStaff />}></Route>
            <Route path="/admin/settings" element={<Adminsettings />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
