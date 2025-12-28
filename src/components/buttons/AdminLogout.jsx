import React from "react";
import axios from "axios";
import { House, FileText, FilePlusCorner, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-3 items-center hover:bg-[#e42020] hover:text-white 
  focus:bg-[#faa005] focus:text-black px-4 py-2 align-text-bottom text-xl font-semibold rounded-xl cursor-pointer"
      onClick={async (e) => {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `${import.meta.env.VITE_LOCAL_URL}/admin/logout`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          localStorage.removeItem("token");
          localStorage.removeItem("adminName");
          // console.log(response);
          notify(response.data, "success");
          navigate("/");
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      }}
    >
      <LogOut size={30} />
      Logout
    </div>
  );
};

export default LogoutButton;
