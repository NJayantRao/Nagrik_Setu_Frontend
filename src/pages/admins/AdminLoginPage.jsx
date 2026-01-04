import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { AdminDataContext } from "../../context/AdminContext";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminPassword, setAdminPassword, adminUniqueId, setAdminUniqueId } =
    useContext(AdminDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    // console.log(adminUniqueId, adminPassword);
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/admin/login`,
        {
          uniqueId: adminUniqueId,
          password: adminPassword,
        },
        { withCredentials: true }
      );
      const token = response.data.token;
      // console.log(response.data.token);

      localStorage.setItem("token", JSON.stringify(token));

      setTimeout(() => {
        setIsLoading(false);
        setIsDisabled(false);
        notify("Logged-In Successfully!", "success");
        navigate("/admin/dashboard");
      }, 4000);
      setAdminUniqueId("");
      setAdminPassword("");
    } catch (error) {
      //eslint-disable-next-line no-console
      console.log(error);
      // 🔴 NETWORK ERROR (backend unreachable)
      if (!error.response) {
        setIsLoading(false);
        setIsDisabled(false);
        notify("Server is Unreachable. Please try again later.", "error");
        setErrorStatus(500);
        setErrorMsg("Server is unreachable");
        return;
      }
      if (
        error.response.status === 401 &&
        error.response?.data === "Incorrect password"
      ) {
        setIsLoading(false);
        setIsDisabled(false);
        notify(error.response.data, "error");
      } else if (error.response?.status === 401) {
        setIsLoading(false);
        setIsDisabled(false);
        notify(error.response.data, "error");
        setAdminUniqueId("");
        setAdminPassword("");
      } else {
        //eslint-disable-next-line no-console
        console.log(error);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
  }

  if (isLoading) {
    return <Loader />;
  }
  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
  }
  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-3xl font-semibold">
          <h1>Login</h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Unique ID
            <input
              type="text"
              placeholder="ADM-XYZA-12345678"
              name="uniqueId"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminUniqueId ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={adminUniqueId}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminUniqueId(e.target.value);
                //console.log(adminUniqueId);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg ">
            Password
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Your Password"
                name="password"
                className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminPassword ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
                value={adminPassword}
                disabled={isDisabled}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  //console.log(adminPassword);
                }}
                minLength={8}
                maxLength={20}
                required
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>
          <div className="font-semibold text-gray-600 text-base flex justify-between items-center p-2">
            <div className="flex gap-2">
              <input type="checkbox" name="Remember" id="Remember" />
              <h2>Remember Me</h2>
            </div>
            <div>
              <h2
                className="hover:text-gray-700 hover:font-bold hover:cursor-pointer"
                onClick={() => {
                  navigate("/admin/forgotPassword");
                }}
              >
                Forgot Password?
              </h2>
            </div>
          </div>
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
