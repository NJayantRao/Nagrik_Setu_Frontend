import { use, useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import UserMain from "../../components/UserMain";
import MyComplaints from "../../components/MyComplaints";
import { UserDataContext } from "../../context/UserContext";

function UserComplaints() {
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
    errorMsg,
    setErrorMsg,
    errorStatus,
    setErrorStatus,
  } = useContext(UserDataContext);
  const [countFiled, setCountFiled] = useState(0);
  const [countInProgress, setCountInProgress] = useState(0);
  const [countResolved, setCountResolved] = useState(0);
  const [countRejected, setCountRejected] = useState(0);
  const [complaintList, setComplaintList] = useState([]);

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
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setId(response.data.id);

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
          setErrorMsg("Something went wrong");
        }
      }
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchComplaintsInfo = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/user/profile/complaints`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let f = 0,
          ip = 0,
          r = 0,
          rej = 0;

        response.data.forEach((ele) => {
          if (ele.status === "Filed") f++;
          else if (ele.status === "In-Progress") ip++;
          else if (ele.status === "Resolved") r++;
          else if (ele.status === "Rejected") rej++;
        });

        setCountFiled(f);
        setCountInProgress(ip);
        setCountResolved(r);
        setCountRejected(rej);

        setComplaintList(response.data);

        console.log(countFiled, countInProgress, countRejected, countResolved);
      } catch (error) {
        console.log(error);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    };

    fetchComplaintsInfo();
  }, []);
  if (errorStatus === 401 || errorStatus === 500) {
    return (
      <div>
        <h1 className="text-3xl sm:text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold ">
          {errorStatus} - {errorMsg}
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden ">
      <Topbar name={name} />
      <div className="flex ">
        <Sidebar email={email} uniqueToken={uniqueToken} />
        <MyComplaints
          complaints={complaintList}
          filed={countFiled}
          inProgress={countInProgress}
          resolved={countResolved}
          rejected={countRejected}
        />
      </div>
    </div>
  );
}

export default UserComplaints;
