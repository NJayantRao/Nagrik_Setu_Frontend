import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Lazy-loaded layout components
 * Used to control whether Navbar is visible
 */
const NavbarLayout = lazy(() => import("./layout/NavbarLayout"));
const NoNavbarLayout = lazy(() => import("./layout/NoNavbarLayout"));

/**
 * Common pages
 */
const Home = lazy(() => import("./pages/common/Home"));
const ErrorPage = lazy(() => import("./pages/common/ErrorPage"));

/**
 * User authentication & profile pages
 */
const UserSignUpPage = lazy(() => import("./pages/users/UserSignUpPage"));
const UserLoginPage = lazy(() => import("./pages/users/UserLoginPage"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const UserForgotPassword = lazy(
  () => import("./pages/users/UserForgotpassword")
);
const UserResetPassword = lazy(() => import("./pages/users/UserResetPassword"));

/**
 * User complaint-related pages
 */
const UserComplaints = lazy(() => import("./pages/users/UserComplaints"));
const ComplaintsRegister = lazy(
  () => import("./pages/users/ComplaintsRegister")
);

/**
 * Admin authentication & profile pages
 */
const AdminSignUpPage = lazy(() => import("./pages/admins/AdminSignUpPage"));
const AdminLoginPage = lazy(() => import("./pages/admins/AdminLoginPage"));
const AdminForgotPassword = lazy(
  () => import("./pages/admins/AdminForgotPassword")
);
const AdminResetPassword = lazy(
  () => import("./pages/admins/AdminResetPassword")
);

/**
 * Shared loader for lazy-loaded routes
 */
const Loader = lazy(() => import("./components/common/Loaders"));

/**
 * Admin dashboard pages
 */
const AdminDashboard = lazy(() => import("./pages/admins/AdminDashboard"));
const AdminDepartments = lazy(() => import("./pages/admins/AdminDepartments"));
const AdminComplaints = lazy(() => import("./pages/admins/AdminComplaints"));
const AdminUsersList = lazy(() => import("./pages/admins/AdminUsersList"));
const AdminStaff = lazy(() => import("./pages/admins/AdminStaff"));
const Adminsettings = lazy(() => import("./pages/admins/AdminSettings"));

/**
 * User dashboard page
 */
const UserDashboard = lazy(() => import("./pages/users/UserDashboard"));

function App() {
  /**
   * Global UI state from context
   * Used to handle login dropdown / modal visibility
   */
  const { setIsLoginClicked, isLoginClicked } = useContext(UserDataContext);

  return (
    <div
      className="min-h-screen w-full bg-[#e0e7ff] relative hide-scrollbar"
      // Close login dropdown when clicking outside
      onClick={() => {
        if (isLoginClicked) {
          setIsLoginClicked(!isLoginClicked);
        }
      }}
    >
      {/* Global toast notification container */}
      <ToastContainer
        position="top-center"
        theme="light"
        newestOnTop
        closeOnClick
      />

      {/* Suspense handles lazy-loaded components */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Routes that include Navbar */}
          <Route element={<NavbarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/signup" element={<UserSignUpPage />} />
            <Route path="/admin/signup" element={<AdminSignUpPage />} />
            <Route path="/user/login" element={<UserLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/user/forgotPassword"
              element={<UserForgotPassword />}
            />
            <Route
              path="/admin/forgotPassword"
              element={<AdminForgotPassword />}
            />
            <Route path="/user/resetPassword" element={<UserResetPassword />} />
            <Route
              path="/admin/resetPassword"
              element={<AdminResetPassword />}
            />
          </Route>

          {/* Routes without Navbar (dashboards & profiles) */}
          <Route element={<NoNavbarLayout />}>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route
              path="/user/profile/complaints"
              element={<UserComplaints />}
            />
            <Route
              path="/user/profile/complaints/Register"
              element={<ComplaintsRegister />}
            />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/usersList" element={<AdminUsersList />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
            <Route path="/admin/settings" element={<Adminsettings />} />
            <Route path="/admin/departments" element={<AdminDepartments />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
