import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar  from "./components/Navbar"
import RightSection from "./components/RightSection"
import UserSignUpPage from "./pages/UserSignUpPage"
import AdminSignUpPage from "./pages/AdminSignUpPage"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"


function App(){
  const {setIsLoginClicked,isLoginClicked}= useContext(UserDataContext)
  return(
    <div className="h-screen w-full bg-[#e0e7ff] relative" onClick={()=>{
    
      if(isLoginClicked){
        setIsLoginClicked(!isLoginClicked)
      }
    }}>
      <Navbar />
        <Routes>
          <Route path="/usersignup" element={<UserSignUpPage />}></Route>
          <Route path="/adminsignup" element={<AdminSignUpPage />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>      
    </div>
  )
}

export default App