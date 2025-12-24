import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import NavbarLayout from "./layout/NavbarLayout";
import NoNavbarLayout from "./layout/NoNavbarLayout";
import Home from "./pages/common/Home";
import ErrorPage from "./pages/common/ErrorPage";
import UserSignUpPage from "./pages/users/UserSignUpPage";
import UserLoginPage from "./pages/users/UserLoginPage";
import UserProfile from "./pages/users/UserProfile";
import UserForgotPassword from "./pages/users/UserForgotpassword";
import UserResetPassword from "./pages/users/UserResetPassword";
import UserComplaints from "./pages/users/UserComplaints";
import ComplaintsRegister from "./pages/users/ComplaintsRegister";
import AdminSignUpPage from "./pages/admins/AdminSignUpPage";
import AdminProfile from "./pages/admins/AdminProfile";
import AdminForgotPassword from "./pages/admins/AdminForgotPassword";
import AdminResetPassword from "./pages/admins/AdminResetPassword";
import AdminLoginPage from "./pages/admins/AdminLoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { setIsLoginClicked, isLoginClicked } = useContext(UserDataContext);
  return (
    <div
      className="h-screen w-full bg-[#e0e7ff] relative"
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
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
