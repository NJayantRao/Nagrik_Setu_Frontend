import { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { Eye,EyeOff } from 'lucide-react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import UserMain from "../components/UserMain";

function UserProfile(){
    const navigate= useNavigate()
    const [name,setName]= useState("")

    useEffect(()=>{
        async function fetchUserInfo() {
            try {
                const token= JSON.parse(localStorage.getItem("token"))
                const response= await axios.get("http://localhost:3000/api/v1/user/profile",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setName(response.data.name)
            } catch (error) {
                console.log(error);
                return(
                    
                        <div>
                            error occured
                        </div>
                    
                )
                
            }
        }
        fetchUserInfo();
    },[])
    return(
        <div className="h-screen w-full overflow-hidden ">
            <Topbar />
           <div className="flex ">
             <Sidebar />
            <UserMain />
           </div>
        </div>
    )
}

export default UserProfile