import React from "react";
import axios from "axios";
import { Trash } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteButton = () => {
  const navigate = useNavigate();
  const notify = (message, type = "success") => {
    const colors = {
      success: "#4f46e5", // Indigo (your success color)
      error: "#dc2626", // Red-600
      info: "#2563eb", // Blue-600
      warning: "#f59e0b", // Amber-500
    };

    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "colored",
      style: {
        background: colors[type],
        color: "#fff",
        fontWeight: "600",
        borderRadius: "10px",
      },
    });
  };
  return (
    <div className="bg-red-600 sm:bg-red-600 flex justify-center items-center p-2 hover:scale-105  rounded-xl">
      <div
        className="flex items-center gap-2 text-white font-semibold cursor-pointer sm:font-medium "
        onClick={async (e) => {
          try {
            const token = JSON.parse(localStorage.getItem("token"));
            const del = await axios.delete(
              `${import.meta.env.VITE_LOCAL_URL}/user/delete`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            localStorage.removeItem("token");
            console.log(del);
            notify(del.data, "error");
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Trash size={18} />
        Delete Account
      </div>
    </div>
  );
};

export default DeleteButton;
