import { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { Eye,EyeOff } from 'lucide-react';
import axios from "axios"
import { useNavigate } from "react-router-dom";

function AdminProfile(){
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
        <div className="h-screen w-full">
            <h1 className="text-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">Hello From Admin</h1>
            <div>
                    <ul>
                        <li>{`${name}`}</li>
                        <li>{`${name}`}</li>
                        <li>{`${name}`}</li>
                        <li>{`${name}`}</li>
                        <li>{`${name}`}</li>
                        <li>{`${name}`}</li>
                    </ul>
                </div>
        </div>
    )
}

export default AdminProfile