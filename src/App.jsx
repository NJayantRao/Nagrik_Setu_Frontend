import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar  from "./components/Navbar"
import RightSection from "./components/RightSection"
import UserSignUpPage from "./pages/UserSignUpPage"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"


function App(){
  const {setIsLoginClicked,isLoginClicked}= useContext(UserDataContext)
  return(
    <div className="h-screen w-full bg-gray-200 relative" onClick={()=>{
      setIsLoginClicked(!isLoginClicked)
    }}>
      <Navbar />
        <Routes>
          <Route path="/login" element={<UserSignUpPage />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>      
    </div>
  )
}

export default App