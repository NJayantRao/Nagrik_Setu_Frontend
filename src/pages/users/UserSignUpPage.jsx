import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import { notify } from "../../utils/notify";
import Loader from "../../components/common/Loaders";
import Errors from "../../components/common/Errors";

function UserSignUpPage() {
  const {
    setName,
    setEmail,
    setPassword,
    setAddress,
    setPhone,
    name,
    email,
    password,
    address,
    phone,
    errorMsg,
    setErrorMsg,
    errorStatus,
    setErrorStatus,
  } = useContext(UserDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    // console.log(name,email,password,address,phone);
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/user/signup`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        { withCredentials: true }
      );
      const token = response.data.token;
      // console.log(response.data.token);

      localStorage.setItem("token", JSON.stringify(token));

      setTimeout(() => {
        notify("Account Created Successfully...", "success");
        setIsLoading(false);
        setIsDisabled(false);
        navigate("/user/dashboard");
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
      if (error.response?.status === 400) {
        notify(error.response.data, "error");
        setTimeout(() => {
          setIsLoading(false);
          setIsDisabled(false);
          navigate("/user/login");
        }, 4000);
      } else {
        setIsLoading(false);
        setIsDisabled(false);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setPhone("");
  }

  if (isLoading) {
    return <Loader />;
  }

  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
  }

  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-3 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-3/4  sm:w-1/3 flex justify-center flex-col gap-1 sm:gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-lg sm:text-3xl font-semibold">
          <h1>Sign-Up</h1>
        </div>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="font-semibold text-gray-600 text-sm sm:text-lg">
            Name
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              className={`py-1 px-2 sm:py-2 sm:px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${name ? "bg-[#e0e7ff]" : "bg-gray-200"}`}
              value={name}
              disabled={isDisabled}
              onChange={(e) => {
                setName(e.target.value);
                //console.log(name);
              }}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-sm sm:text-lg">
            E-Mail
            <input
              type="email"
              placeholder="Enter Your E-Mail"
              name="email"
              className={`py-1 px-2 sm:py-2 sm:px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${email ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={email}
              disabled={isDisabled}
              onChange={(e) => {
                setEmail(e.target.value);
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
          <div className="font-semibold text-gray-600 text-sm sm:text-lg ">
            Password
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Enter Your Password"
                name="password"
                className={`py-1 px-2 sm:py-2 sm:px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${password ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer text-sm"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
            </div>
          </div>
          <div className="font-semibold text-gray-600 text-sm sm:text-lg">
            Phone
            <input
              type="text"
              placeholder="Enter Your Contact number"
              name="phone"
              className={`py-1 px-2 sm:py-2 sm:px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${phone ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={phone}
              disabled={isDisabled}
              onChange={(e) => {
                setPhone(e.target.value);
                //console.log(phone);
              }}
              minLength={10}
              maxLength={10}
              required
            />
          </div>
          <div className="font-semibold text-gray-600 text-sm sm:text-lg">
            Address
            <input
              type="text"
              placeholder="Enter Your City"
              name="address"
              className={`py-1 px-2 sm:py-2 sm:px-4 rounded-xl w-full text-gray-600 text-sm shadow-sm focus:outline-none focus:ring-2 focus:bg-[#e0e7ff] focus:ring-blue-400 ${address ? "bg-[#e8f0ff]" : "bg-gray-200"}`}
              value={address}
              disabled={isDisabled}
              onChange={(e) => {
                setAddress(e.target.value);
                //console.log(address);
              }}
              required
            />
          </div>
          <div className="w-full flex justify-center mt-0.5 p-2">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-blue-600 py-1 px-3 sm:p-2 sm:w-1/2 rounded-xl sm:rounded-full text-lg sm:text-xl text-white  font-semibold sm:font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSignUpPage;
