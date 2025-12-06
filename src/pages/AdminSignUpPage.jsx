import Navbar from "../components/Navbar"


function AdminSignUpPage(){
    return(
        <div className=" bg-[#e0e7ff] flex justify-center items-center p-3 max-h-screen" onClick={(e)=>{
        
        }}>
           <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
            <div className="text-center text-3xl font-semibold"><h1>Admin Sign-Up</h1></div>
            <form className="flex flex-col gap-2 w-full">
                <div className="font-semibold text-gray-600 text-lg">Name<input type="text" placeholder="Enter Your Name" name="name" className=" py-2 px-4 bg-gray-200 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                <div className="font-semibold text-gray-600 text-lg">E-Mail<input type="text" placeholder="Enter Your E-Mail" name="email" className=" py-2 px-4 bg-gray-200 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                <div className="font-semibold text-gray-600 text-lg">Password<input type="password" placeholder="Enter Your Password" name="password" className=" py-2 px-4 bg-gray-200 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                <div className="font-semibold text-gray-600 text-lg">Phone<input type="text" placeholder="Enter Your Contact number" name="phone" className=" py-2 px-4 bg-gray-200 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                <div className="font-semibold text-gray-600 text-lg">Address<input type="text" placeholder="Enter Your Address" name="address" className=" py-2 px-4 bg-gray-200 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                <div className="w-full flex justify-center mt-0.5">
                    <button type="submit" className="bg-blue-700 p-2 w-1/3 rounded-full text-xl text-white">SIGN IN</button>
                </div>
            </form>
           </div>
        </div>
    )
}

export default AdminSignUpPage