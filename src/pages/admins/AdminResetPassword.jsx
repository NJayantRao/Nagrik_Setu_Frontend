import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { AdminDataContext } from "../../context/AdminContext";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function AdminResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAdminUniqueId, adminUniqueId, adminPassword, setAdminPassword } =
    useContext(AdminDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/admin/resetPassword`,
        { uniqueId: adminUniqueId, otp, newPassword: adminPassword }
      );
      notify(response.data, "success");
      setAdminUniqueId("");
      setOtp("");
      setAdminPassword("");

      setIsDisabled(false);
      setIsLoading(false);
      navigate("/admin/login");
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
      if (error.response?.status === 401) {
        setIsLoading(false);
        setIsDisabled(false);
        notify(error.response.data, "error");
        setAdminUniqueId("");
      } else {
        //eslint-disable-next-line no-console
        console.log(error);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
  }

  useEffect(() => {
    if (location.state?.fromForgotPassword) {
      notify("OTP Sent to Registered E-Mail...");
    }
  }, []);
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
          <h1>Reset Password</h1>
        </div>
        <form
          className="flex flex-col gap-5 w-full p-3"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Enter Your Unique ID
            <input
              type="text"
              placeholder="ADM-XYZA-12345678"
              name="uniqueId"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminUniqueId ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={adminUniqueId}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminUniqueId(e.target.value);
                //console.log(uniqueToken);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            Enter OTP
            <input
              type="text"
              placeholder="123456"
              name="otp"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${otp ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={otp}
              disabled={isDisabled}
              maxLength={6}
              minLength={6}
              onChange={(e) => {
                setOtp(e.target.value);
                //console.log(uniqueId);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg ">
            Enter New Password
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter New Password"
                name="password"
                className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminPassword ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
                value={adminPassword}
                disabled={isDisabled}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  //console.log(password);
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
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminResetPassword;
