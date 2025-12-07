import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { Eye,EyeOff } from "lucide-react";
import Loader from "../components/loader";
import axios from "axios";

function AdminLoginPage(){
    const navigate= useNavigate()
    const {setUniqueId,setPassword,name,email,password,address,phone,uniqueId}= useContext(UserDataContext)
    const [showPassword,setShowPassword]= useState(false)
    const [isLoading,setIsLoading]= useState(false)

    async function submitHandler(e){
        e.preventDefault()
        console.log(uniqueId,password);
        setIsLoading(true)
        try {
            const response= await axios.post("http://localhost:3000/api/v1/user/login",{
                uniqueId,password
            },{withCredentials:true})
            const token= response.data.token;
            console.log(response.data.token);

            localStorage.setItem("token",JSON.stringify(token))
            setUniqueId("")
            setPassword("")

            setTimeout(() => {
                setIsLoading(false)
                navigate("/admin/profile")
            }, 3000);
            
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            navigate("/admin/profile")
        }
    }

    if(isLoading){
        return(
            <Loader />
        )
    }
    return(
        <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
           <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
            <div className="text-center text-3xl font-semibold"><h1>Admin Login</h1></div>
            <form className="flex flex-col gap-2 w-full" onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <div className="font-semibold text-gray-600 text-lg">
                    Unique ID
                    <input type="text" placeholder="ADM-XYZA-12345678" name="uniqueId" 
                    className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${uniqueId?"bg-[#e0e7ff]":"bg-gray-200"}`} 
                    value={uniqueId} 
                    onChange={(e)=>{
                        setUniqueId(e.target.value);
                        //console.log(uniqueId);
                    }} 
                    required/>
                </div>
                <div className="font-semibold text-gray-600 text-lg ">
                    Password
                    <div className="relative">
                        <input type={`${showPassword?"text":"password"}`} placeholder="Enter Your Password" name="password" className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${password?"bg-[#e8f0ff]":"bg-gray-200"}`} 
                    value={password} 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        //console.log(password);
                    }} 
                    minLength={8}
                    maxLength={20}
                    required />
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer" onClick={()=>{
                    setShowPassword(!showPassword)
                   }}>{showPassword?<Eye/>:<EyeOff/>}</div>
                    </div>
                </div>
                <div className="font-semibold text-gray-600 text-base flex justify-between items-center p-2">
                   <div className="flex gap-2"><input type="checkbox" name="Remember" id="Remember" /><h2>Remember Me</h2></div>
                   <div><h2 className="hover:text-gray-700 hover:font-bold hover:cursor-pointer" onClick={()=>{
                    navigate("/admin/forgotPassword")
                   }}>Forgot Password?</h2></div>
                </div>
                <div className="w-full flex justify-center mt-0.5">
                    <button type="submit" className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out">Login</button>
                </div>
            </form>
           </div>
        </div>
    )
}

export default AdminLoginPage