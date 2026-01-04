import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminDataContext } from "../../context/AdminContext";
import { notify } from "../../utils/notify";
import Errors from "../../components/common/Errors";

function AdminForgotPassword() {
  const navigate = useNavigate();
  const { adminUniqueId, setAdminUniqueId } = useContext(AdminDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/admin/forgotPassword`,
        { uniqueId: adminUniqueId }
      );

      setAdminUniqueId("");
      setTimeout(() => {
        setIsLoading(false);
        setIsDisabled(false);
        navigate("/admin/resetPassword", {
          state: { fromForgotPassword: true },
        });
      }, 4000);
      // console.log(adminUniqueId);
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
  if (errorStatus === 401 || errorStatus === 500) {
    return <Errors status={errorStatus} message={errorMsg} />;
  }
  return (
    <div className=" bg-[#e0e7ff] flex justify-center items-center p-5 max-h-screen">
      <div className=" bg-[#f8fafc] p-3 w-1/3 flex justify-center flex-col gap-3 shadow-2xl rounded-2xl  border-indigo-200 border-3">
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
          <div className="w-full flex justify-center mt-0.5">
            <button
              type="submit"
              disabled={isDisabled}
              className="bg-blue-600 p-2 w-1/2 rounded-full text-xl text-white font-bold hover:scale-105 hover:cursor-pointer hover:bg-blue-700 hover:ease-in-out"
            >
              {isLoading ? "Sending..." : "Send OTP!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPassword;
