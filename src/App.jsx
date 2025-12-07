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
import UserLoginPage from "./pages/UserLoginPage"
import UserForgotPassword from "./pages/UserForgotpassword"
import UserResetPassword from "./pages/UserResetPassword"

function App(){
  const {setIsLoginClicked,isLoginClicked}= useContext(UserDataContext)
  return(
    <div className="h-screen w-full bg-[#e0e7ff] relative" onClick={()=>{
    
      if(isLoginClicked){
        setIsLoginClicked(!isLoginClicked)
      }
    }}>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route path="/user/signup" element={<UserSignUpPage />}></Route>
            <Route path="/admin/signup" element={<AdminSignUpPage />}></Route>
            <Route path="/user/login" element={<UserLoginPage />}></Route>
            <Route path="/user/forgotPassword" element={<UserForgotPassword />}></Route>
            <Route path="/user/resetPassword" element={<UserResetPassword />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<NoNavbarLayout />}>
            <Route path="/user/profile" element={<UserProfile />}></Route>
          </Route>
        </Routes>      
    </div>
  )
}

export default App