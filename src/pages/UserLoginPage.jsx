import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { Eye,EyeOff } from "lucide-react";
import Loader from "../components/loader";
import axios from "axios";
import { toast } from "react-toastify";

function UserLoginPage(){
    const navigate= useNavigate()
    const {uniqueToken,setUniqueToken,setPassword,name,email,password,address,phone}= useContext(UserDataContext)
    const [showPassword,setShowPassword]= useState(false)
    const [isLoading,setIsLoading]= useState(false)

        const notify = (err) =>{
            toast.error(err, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: "#dc2626",   // red-600
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
        }

    async function submitHandler(e){
        e.preventDefault()
        console.log(uniqueToken,password);
        try {
            const response= await axios.post(`${import.meta.env.VITE_LOCAL_URL}/user/login`,{
                uniqueToken,password
            },{withCredentials:true})
            setIsLoading(true)
            const token= response.data.token;
            console.log(response.data.token);

            localStorage.setItem("token",JSON.stringify(token))

            setTimeout(() => {
                setIsLoading(false)
                navigate("/user/profile")
            }, 3000);
            setUniqueToken("")
            setPassword("")
        } catch (error) {
            console.log(error);
            // setIsLoading(false)
            if(error.response?.status === 401){
                notify(error.response.data)
                setUniqueToken("")
                setPassword("")
                setTimeout(() => {
                    navigate("/user/signup")
                }, 4000);
            } else if(error.response?.status === 402){
                notify(error.response.data)
            }else{
                console.log(error);
                
            }
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
            <div className="text-center text-3xl font-semibold"><h1>Login</h1></div>
            <form className="flex flex-col gap-2 w-full" onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <div className="font-semibold text-gray-600 text-lg">
                    Unique ID
                    <input type="text" placeholder="CIV-XYZA-12345678" name="uniqueId" 
                    className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${uniqueToken?"bg-[#e0e7ff]":"bg-gray-200"}`} 
                    value={uniqueToken} 
                    onChange={(e)=>{
                        setUniqueToken(e.target.value);
                        //console.log(uniqueToken);
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
                    navigate("/user/forgotPassword")
                   }}>Forgot Password?</h2></div>
                </div>
                <div className="w-full flex justify-center mt-0.5">
                    <button type="submit" className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out" onClick={()=>{
                        
                    }}>Login</button>
                </div>
                 <div className="font-semibold text-gray-600 text-sm flex justify-between items-center p-2">
                   <div className="flex justify-center gap-1 text-center w-full text-base">
                        <div><h2>Don't have an Account? <span className="font-bold text-gray-700 hover:cursor-pointer" onClick={()=>{
                            navigate("/user/signup")
                        }}>Sign Up</span></h2></div>
                    </div>
                </div>
            </form>
           </div>
        </div>
    )
}

export default UserLoginPage