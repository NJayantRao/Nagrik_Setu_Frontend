import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import { Eye,EyeOff } from 'lucide-react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function UserSignUpPage(){

    const {setName,setEmail,setPassword,setAddress,setPhone,name,email,password,address,phone,uniqueId}= useContext(UserDataContext)
    // const [name,setName]= useState("")
    // const [email,setEmail]= useState("")
    // const [password,setPassword]= useState("")
    // const [address,setAddress]= useState("")
    // const [phone,setPhone]= useState("")
    const [showPassword,setShowPassword]= useState(false)

    const navigate= useNavigate()

    async function submitHandler(e){
        e.preventDefault()
        console.log(name,email,password,address,phone);
        try {
            const response= await axios.post("http://localhost:3000/api/v1/user/signup",{
                name,email,password,phone,address
            },{withCredentials:true})
            const token= response.data.token;
            console.log(response.data.token);

            localStorage.setItem("token",JSON.stringify(token))

            setTimeout(() => {
                navigate("/user/profile")
            }, 5000);

        } catch (error) {
            console.log(error);
        }
        setName("")
        setEmail("")
        setPassword("")
        setAddress("")
        setPhone("")
    }

    useEffect(()=>{
        async function fetchData(){
            const api= await axios.get("http://localhost:3000/")
        console.log(api);
        }
        fetchData()
    },[])

    // useEffect(()=>{

    // },[])
    return(
        <div className=" bg-[#e0e7ff] flex justify-center items-center p-3 max-h-screen">
           <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
            <div className="text-center text-3xl font-semibold"><h1>Sign-Up</h1></div>
            <form className="flex flex-col gap-2 w-full" onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <div className="font-semibold text-gray-600 text-lg">
                    Name
                    <input type="text" placeholder="Enter Your Name" name="name" 
                    className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${name?"bg-[#e0e7ff]":"bg-gray-200"}`} 
                    value={name} 
                    onChange={(e)=>{
                        setName(e.target.value);
                        //console.log(name);
                    }} 
                    required/>
                </div>
                <div className="font-semibold text-gray-600 text-lg">
                    E-Mail
                    <input type="email" placeholder="Enter Your E-Mail" name="email" 
                    className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${email?"bg-[#e8f0ff]":"bg-gray-200"}`} 
                    value={email} 
                    onChange={(e)=>{
                        setEmail(e.target.value);
                        //console.log(email);
                    }} 
                    onInvalid={(e)=>{
                        e.target.setCustomValidity("Enter Valid E-Mail ID")
                    }}
                    onInput={(e)=>{
                        e.target.setCustomValidity("")
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
                <div className="font-semibold text-gray-600 text-lg">
                    Phone
                    <input type="text" placeholder="Enter Your Contact number" name="phone" className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${phone?"bg-[#e8f0ff]":"bg-gray-200"}`} 
                    value={phone} 
                    onChange={(e)=>{
                        setPhone(e.target.value);
                        //console.log(name);
                    }} 
                    minLength={10}
                    maxLength={10}
                    required/>
                </div>
                <div className="font-semibold text-gray-600 text-lg">
                    Address
                    <input type="text" placeholder="Enter Your City" name="address" className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${address?"bg-[#e8f0ff]":"bg-gray-200"}`} 
                    value={address} 
                    onChange={(e)=>{
                        setAddress(e.target.value);
                        //console.log(name);
                    }} 
                    required/>
                </div>
                <div className="w-full flex justify-center mt-0.5 p-2">
                    <button type="submit" className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out">Sign Up</button>
                </div>
            </form>
           </div>
        </div>
    )
}

export default UserSignUpPage