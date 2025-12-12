import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function UserForgotPassword() {
  const navigate = useNavigate();
  const {
    setUniqueToken,
    uniqueToken,
    errorMsg,
    setErrorMsg,
    errorStatus,
    setErrorStatus,
    isDisabled,
    setIsDisabled,
  } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const notify = (err) => {
    toast.error(err, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: "#dc2626", // red-600
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/user/forgotPassword`,
        { uniqueToken }
      );

      setTimeout(() => {
        setUniqueToken("");
        setLoading(false);
        navigate("/user/resetPassword", {
          state: { fromForgotPassword: true },
        });
      }, 4000);
      // console.log(uniqueId);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log(error);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
        console.log(errorStatus);
        setIsDisabled(false);
      } else {
        console.log(error);
        setErrorStatus(500);
        setErrorMsg("Something went wrong");
        setIsDisabled(false);
      }
    }
  }

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
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-3/4 sm:w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
        <div className="text-center text-3xl font-semibold">
          <h1>Forgot Password</h1>
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
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-blue-600 py-1 px-2 sm:p-2 w-1/2 rounded-xl sm:rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              {loading ? "Sending..." : "Send OTP!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForgotPassword;
