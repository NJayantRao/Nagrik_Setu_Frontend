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
        <div className="bg-[#1D4ED8] w-full h-25 px-2 py-3 flex items-center justify-around shadow-xl text-gray-300 text-xl font-bold" onClick={(e)=>{
        
        }}>
             <LeftSection />
            <div className="hover:cursor-pointer relative dropdown" onClick={(e)=>{
                navigate("/")
            }}><h1>Home</h1></div>
            <div className="hover:cursor-pointer relative dropdown"><h1>Report Issue</h1></div>
            <div className="hover:cursor-pointer relative dropdown"><h1>Track Issue</h1></div>
            <div className="hover:cursor-pointer relative dropdown"><h1>Help</h1></div>
            <div className="hover:cursor-pointer relative dropdown"><h1>Contact</h1></div>
            <div className=" mr-2 relative">
                <Button />
                <div className="w-60 absolute bg-gray-200 right-0 text-lg flex flex-col gap-2 rounded-md shadow-lg p-5 text-black hover:cursor-pointer" style={{display:isLoginClicked?"block":"none"}}>
                    <div className=" hover:bg-gray-100 px-3 py-1" onClick={(e)=>{
                        
                        navigate("/user/login")
                    }}>User Login</div>
                    <div className=" hover:bg-gray-100 px-3 py-1"onClick={(e)=>{
                        navigate("/admin/login")
                    }}>Admin Login</div>
                    <div className=" hover:bg-gray-100 px-3 py-1" >Staff Login</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar