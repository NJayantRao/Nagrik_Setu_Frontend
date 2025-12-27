import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../components/common/Loaders";
import axios from "axios";
import { notify } from "../../utils/notify";
import Errors from "../../components/common/Errors";

function UserResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setUniqueToken,
    uniqueToken,
    password,
    setPassword,
    errorMsg,
    setErrorMsg,
    errorStatus,
    setErrorStatus,
  } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/user/resetPassword`,
        { uniqueToken, otp, newPassword: password }
      );
      setUniqueToken("");
      setOtp("");
      setPassword("");
      notify("Password Saved Successfully...", "success");
      setTimeout(() => {
        setIsDisabled(false);
        setIsLoading(false);
        navigate("/user/login");
      }, 4000);
    } catch (error) {
      // console.log(error);
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
      } else {
        // console.log(error);
        setIsLoading(false);
        setIsDisabled(false);
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
      <div className=" bg-[#f8fafc] p-3 w-3/4 sm:w-1/3 flex justify-center flex-col gap-2 sm:gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-2xl sm:text-3xl font-semibold">
          <h1>Reset Password</h1>
        </div>
        <form
          className="flex flex-col gap-3 sm:gap-5 w-full p-2 sm:p-3"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Enter Your Unique ID
            <input
              type="text"
              placeholder="CIV-XYZA-12345678"
              name="uniqueId"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${uniqueToken ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={uniqueToken}
              disabled={isDisabled}
              onChange={(e) => {
                setUniqueToken(e.target.value);
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
                className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${password ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
                value={password}
                disabled={isDisabled}
                onChange={(e) => {
                  setPassword(e.target.value);
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
              className="bg-blue-600 p-2 w-3/4 rounded-xl sm:rounded-full text-lg sm:text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserResetPassword;
