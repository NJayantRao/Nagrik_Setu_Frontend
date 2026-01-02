import { useContext, useState } from "react";
import { AdminDataContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Loader from "../../components/common/Loaders";
import { notify } from "../../utils/notify";
import Errors from "../../components/common/Errors";
function AdminSignUpPage() {
  const {
    adminName,
    setAdminName,
    adminEmail,
    setAdminEmail,
    adminPassword,
    setAdminPassword,
    adminAddress,
    setAdminAddress,
    adminPhone,
    setAdminPhone,
    setErrorMsg,
    errorMsg,
    setErrorStatus,
    errorStatus,
  } = useContext(AdminDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    // console.log(adminName, adminEmail, adminPassword, adminPhone, adminAddress);
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/admin/signup`,
        {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          phone: adminPhone,
          address: adminAddress,
        },
        { withCredentials: true }
      );
      const token = response.data.token;
      // console.log(response.data.token);

      localStorage.setItem("token", JSON.stringify(token));

      setIsLoading(false);
      setIsDisabled(false);
      notify("Admin Account Created!", "success");
      navigate("/admin/dashboard");
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
      if (error.response?.status === 400) {
        notify(error.response.data, "error");
        setTimeout(() => {
          setIsLoading(false);
          setIsDisabled(false);
          navigate("/admin/login");
        }, 4000);
      } else {
        setIsLoading(false);
        setIsDisabled(false);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
    setAdminAddress("");
    setAdminPhone("");
  }

  if (isLoading) {
    return <Loader />;
  }

  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
  }

  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-3 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-3xl font-semibold">
          <h1>Admin Sign-Up</h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-lg">
            Name
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminName ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={adminName}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminName(e.target.value);
                //console.log(name);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            E-Mail
            <input
              type="email"
              placeholder="Enter Your E-Mail"
              name="email"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminEmail ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={adminEmail}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminEmail(e.target.value);
                //console.log(email);
              }}
              onInvalid={(e) => {
                e.target.setCustomValidity("Enter Valid E-Mail ID");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
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
          <div className="font-semibold text-gray-600 text-lg">
            Phone
            <input
              type="text"
              placeholder="Enter Your Contact number"
              name="phone"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminPhone ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={adminPhone}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminPhone(e.target.value);
                //console.log(name);
              }}
              minLength={10}
              maxLength={10}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-lg">
            Address
            <input
              type="text"
              placeholder="Enter Your City"
              name="address"
              className={` py-2 px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${adminAddress ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={adminAddress}
              disabled={isDisabled}
              onChange={(e) => {
                setAdminAddress(e.target.value);
                //console.log(name);
              }}
              required
            />
          </div>
          <div className="w-full flex justify-center mt-0.5 p-2">
            <button
              type="submit"
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignUpPage;
