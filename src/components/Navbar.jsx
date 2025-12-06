import LeftSection from "./LeftSection"
import RightSection from "./RightSection"
import Button from "./Button"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {UserDataContext} from "../context/UserContext"

function Navbar(){
    const {isLoginClicked,setIsLoginClicked}= useContext(UserDataContext)
    const navigate= useNavigate()
    return(
        <div className="bg-blue-600 w-full h-25 px-2 py-3 flex items-center justify-around">
             <LeftSection />
            <div><h1>Home</h1></div>
            <div><h1>Report Issue</h1></div>
            <div><h1>Track Issue</h1></div>
            <div><h1>Help</h1></div>
            <div><h1>Contact</h1></div>
            <div className=" mr-2 relative">
                <Button />
                <div className="w-60 absolute bg-gray-200 right-0 text-lg flex flex-col gap-2 rounded-md shadow-lg p-5" style={{display:isLoginClicked?"block":"none"}}>
                    <div className=" hover:bg-gray-100 px-3 py-1" onClick={()=>{
                        navigate("/login")
                    }}>User Login</div>
                    <div className=" hover:bg-gray-100 px-3 py-1">Admin Login</div>
                    <div className=" hover:bg-gray-100 px-3 py-1" >Staff Login</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar