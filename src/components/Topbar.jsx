import { useNavigate } from "react-router-dom";
import ImageAvatars from "./ImageAvatar";
import LeftSection from "./LeftSection";
import BackgroundLetterAvatars from "./TextAvatar";
import { Menu, House, FileText, User } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";

function Topbar({ name }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();
  const { setIsLoginClicked, isLoginClicked } = useContext(UserDataContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="h-15 w-full bg-[#2a674b] flex justify-between  items-center shadow-xl text-xl font-bold text-[#d6f5e9] px-2 sm:p-0">
      <div className="sm:hidden flex gap-3">
        <House size={30} onClick={()=>{
          navigate("/")
        }}/>
      </div>
      <div
        className="w-1/5 sm:flex justify-center gap-2 items-center hover:cursor-pointer hidden"
        onClick={(e) => {
          navigate("/");
        }}
      >
        <img
          src="https://res.cloudinary.com/dpwqlb3d7/image/upload/v1764314433/My%20Brand/Gemini_Generated_Image_o5l8fro5l8fro5l8_s8srd9.png"
          alt="Nagrik setu"
          className="h-12 w-12 rounded-full"
        />
        <div className=" relative dropdown text-lg">
          <h1>Nagrik Setu</h1>
        </div>
      </div>
      <div className="text-2xl font-bold text-[#d6f5e9] hover:cursor-pointer relative dropdown">
        Dashboard
      </div>
      <div className="flex gap-3 mr-2 p-2  items-center">
        <div className="hover:cursor-pointer relative dropdown text-lg hidden sm:block">
          <h2>Hi, {name}</h2>
        </div>
        <div
          className="hover:cursor-pointer relative"
          onClick={() => {
            if (isMobile) {
              setIsLoginClicked(!isLoginClicked);
            }
          }}
        >
          <BackgroundLetterAvatars string={name} />
          {/* <ImageAvatars /> */}
          <div
            className=" w-40 absolute bg-[#ECFDF5] right-0 text-sm sm:text-lg  sm:hidden flex flex-col gap-4 rounded-md shadow-xl p-1 sm:p-5 text-black hover:cursor-pointer z-50"
            style={{ display: isLoginClicked ? "block" : "none" }}
          >
            <div
              className=" px-2 py-1 flex gap-2 bg-[#A7F3D0] rounded-xl mb-2"
              onClick={(e) => {
                navigate("/");
              }}
            >
              <House size={20} strokeWidth={1.2} />
              <h2 className="font-medium">Home</h2>
            </div>
            <div
              className=" px-2 py-1 flex  gap-2 bg-[#A7F3D0] rounded-xl mb-2"
              onClick={(e) => {
                navigate("/user/profile/complaints");
              }}
            >
              <FileText size={20} strokeWidth={1.2} />
              <h2 className="font-medium">My Complaints</h2>
            </div>
             <div
              className=" px-2 py-1 flex gap-2 bg-[#A7F3D0] rounded-xl mb-2"
              onClick={(e) => {
                navigate("/user/profile");
              }}
            >
              <User size={20} strokeWidth={1.2} />
              <h2 className="font-medium">My Profile</h2>
            </div>
            <div className="flex flex-col gap-2">
              <LogoutButton />
            <DeleteButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
