import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/sidebars/AdminSidebar";
import Search from "../../components/SearchBar";
import SearchBar from "../../components/SearchBar";

function AdminProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     try {
  //       const token = JSON.parse(localStorage.getItem("token"));
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_LOCAL_URL}/user/profile`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // console.log(response.data);
  //       setName(response.data.name);
  //       setEmail(response.data.email);
  //       setUniqueToken(response.data.uniqueToken);
  //       setPhone(response.data.phone);
  //       setAddress(response.data.address);
  //       setId(response.data.id);
  //       // console.log(id);
  //     } catch (error) {
  //       // console.log(error);
  //       // 🔴 NETWORK ERROR (backend unreachable)
  //       if (!error.response) {
  //         notify("Server is Unreachable. Please try again later.", "error");
  //         setErrorStatus(500);
  //         setErrorMsg("Server is unreachable");
  //         return;
  //       }
  //       if (error.response?.status === 401) {
  //         // console.log(error);
  //         setErrorStatus(error.response.status);
  //         setErrorMsg(error.response.data);
  //         // console.log(errorStatus);
  //       } else {
  //         // console.log(error);
  //         setErrorStatus(error.response.status);
  //         setErrorMsg(error.response.data);
  //       }
  //     }
  //   }
  //   fetchUserInfo();
  // }, []);
  return (
    <div className="flex bg-[#f9fafb]">
      <AdminSidebar />
      <div className="w-4/5 shadow-2xl">
        <SearchBar />
      </div>
    </div>
  );
}

export default AdminProfile;
