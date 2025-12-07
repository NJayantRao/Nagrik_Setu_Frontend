import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import NavbarLayout from "./layout/NavbarLayout"
import NoNavbarLayout from "./layout/NoNavbarLayout"
import RightSection from "./components/RightSection"
import UserSignUpPage from "./pages/UserSignUpPage"
import AdminSignUpPage from "./pages/AdminSignUpPage"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"
import UserProfile from "./pages/userprofile"
import AdminProfile from "./pages/AdminProfile"
import UserLoginPage from "./pages/UserLoginPage"
import UserForgotPassword from "./pages/UserForgotpassword"
import AdminForgotPassword from "./pages/AdminForgotPassword"
import UserResetPassword from "./pages/UserResetPassword"
import AdminResetPassword from "./pages/AdminResetPassword"
import AdminLoginPage from "./pages/AdminLoginPage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  const {setIsLoginClicked,isLoginClicked}= useContext(UserDataContext)
  return(
    <div className="h-screen w-full bg-[#e0e7ff] relative" onClick={()=>{
      if(isLoginClicked){
        setIsLoginClicked(!isLoginClicked)
      }
    }}>
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
            <Route path="/user/forgotPassword" element={<UserForgotPassword />}></Route>
            <Route path="/admin/forgotPassword" element={<AdminForgotPassword />}></Route>
            <Route path="/user/resetPassword" element={<UserResetPassword />}></Route>
            <Route path="/admin/resetPassword" element={<AdminResetPassword />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<NoNavbarLayout />}>
            <Route path="/user/profile" element={<UserProfile />}></Route>
            <Route path="/admin/profile" element={<AdminProfile />}></Route>
          </Route>
        </Routes>      
    </div>
  )
}

export default App