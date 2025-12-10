import { use, useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import UserMain from "../components/UserMain";
import MyComplaints from "../components/MyComplaints";
import { UserDataContext } from "../context/UserContext";
import ImageUploader from "../components/ImageUploader";
import { toast } from "react-toastify";

function ComplaintsRegister() {
  const navigate = useNavigate();
  const {
    setName,
    setEmail,
    setPassword,
    setPhone,
    setAddress,
    setUniqueToken,
    name,
    email,
    password,
    address,
    phone,
    uniqueToken,
    id,
    setId,
  } = useContext(UserDataContext);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [departmentId, setDepartmentId] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [registered, setRegistered] = useState(false);

  const notify = (message, type = "success") => {
    const colors = {
      success: "#4f46e5", // Indigo (your success color)
      error: "#dc2626", // Red-600
      info: "#2563eb", // Blue-600
      warning: "#f59e0b", // Amber-500
    };

    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: colors[type],
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      if (!image) {
        notify("Image is Required...", "error");
        return;
      }
      const formData = new FormData();
      formData.append("imageURL", image);
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("department", departmentId);
      const token = JSON.parse(localStorage.getItem("token"));
      setRegistered(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/complaints/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setDesc("");
      setImage(null);
      setDepartmentId("");
      console.log(response);

      setTimeout(() => {
        setRegistered(false);
        notify("Complaint Registered!", "success");
      }, 4000);

      setTimeout(() => {
        navigate("/user/profile");
      }, 5000);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(error);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
        console.log(errorStatus);
      } else {
        console.log(error);
        setErrorStatus(500);
        setErrorMsg("Internal Server Error");
      }
    }
  };

  useEffect(() => {
    async function fetchDepartmentInfo() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/user/profile/complaints/departments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDepartmentList(response.data.departments);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(error);
          setErrorStatus(error.response.status);
          setErrorMsg(error.response.data);
          console.log(errorStatus);
        } else {
          console.log(error);
          setErrorStatus(500);
          setErrorMsg("Internal Server Error");
        }
      }
    }
    fetchDepartmentInfo();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setUniqueToken(response.data.uniqueToken);

        console.log(id);
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(error);
          setErrorStatus(error.response.status);
          setErrorMsg(error.response.data);
          console.log(errorStatus);
        } else {
          console.log(error);
          setErrorStatus(500);
          setErrorMsg("Internal Server Error");
        }
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden ">
      <Topbar name={name} />
      <div className="flex ">
        <Sidebar email={email} uniqueToken={uniqueToken} />
        <div className="bg-[#f2f3f5]  w-full flex  justify-center ">
          <div className=" bg-[#f8fafc] p-3 max-h-[75vh] w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3 mt-10">
            <div className="text-center text-3xl font-semibold mt-2 ">
              <h1>Register Complaint</h1>
            </div>
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="font-semibold text-gray-600 text-lg">
                Title
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${title ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    //console.log(title);
                  }}
                  required
                />
              </div>

              <div className="font-semibold text-gray-600 text-lg">
                Description
                <textarea
                  type="textarea"
                  placeholder="Enter Description"
                  name="desc"
                  className={` py-2 px-4 h-15 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${desc ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                    //console.log(desc);
                  }}
                  required
                />
              </div>
              <ImageUploader image={image} setImage={setImage} />

              <div className="font-semibold text-gray-600 text-lg flex justify-center">
                <select
                  value={departmentId}
                  required
                  onChange={(e) => {
                    setDepartmentId(e.target.value);
                    console.log(e.target.value); // logs selected department _id
                  }}
                  className={`py-1 px-4 w-full rounded-xl text-gray-700 text-sm shadow-md
      bg-white border border-gray-300
      focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500
      hover:border-gray-400 hover:cursor-pointer transition-all `}
                >
                  <option value="">Select Department</option>
                  {departmentList.map((ele, idx) => (
                    <option key={idx} value={ele._id}>
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex justify-center mt-0.5">
                <button
                  type="submit"
                  className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out mb-3"
                >
                  {registered ? "Registering..." : "Registered"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsRegister;
