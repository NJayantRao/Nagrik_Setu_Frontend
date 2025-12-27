import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import axios from "axios";
import { notify } from "../../utils/notify";
import Errors from "../../components/common/Errors";

function UserForgotPassword() {
  const navigate = useNavigate();
  const {
    setUniqueToken,
    uniqueToken,
    errorMsg,
    setErrorMsg,
    errorStatus,
    setErrorStatus,
  } = useContext(UserDataContext);
  const [isSending, setIsSending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsSending(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/user/forgotPassword`,
        { uniqueToken }
      );

      setTimeout(() => {
        setIsSending(false);
        setUniqueToken("");
        navigate("/user/resetPassword", {
          state: { fromForgotPassword: true },
        });
      }, 4000);
      // console.log(uniqueId);
    } catch (error) {
      // console.log(error);
      // 🔴 NETWORK ERROR (backend unreachable)
      if (!error.response) {
        setIsSending(false);
        setIsDisabled(false);
        notify("Server is Unreachable. Please try again later.", "error");
        setErrorStatus(500);
        setErrorMsg("Server is unreachable");
        return;
      }
      if (error.response?.status === 401) {
        setIsSending(false);
        setIsDisabled(false);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
        // console.log(errorStatus);
      } else {
        // console.log(error);
        setIsSending(false);

        setIsDisabled(false);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data);
      }
    }
  }

  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
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
              {isSending ? "Sending..." : "Send OTP!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForgotPassword;
