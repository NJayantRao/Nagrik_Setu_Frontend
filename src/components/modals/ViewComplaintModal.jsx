import React, { useEffect } from "react";
import { X, Clock, CircleCheckBig, XCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";

const ViewComplaintModal = ({ info }) => {
  const navigate = useNavigate();

  async function fetch() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}/admin/complaints/${info._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        document.getElementById("view_modal").close();
        navigate("/admin/complaints");
      }, 4000);
      // console.log(response.data);
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
    }
  }

  return (
    <dialog id="view_modal" className="modal">
      <div className="modal-box max-w-xl rounded-2xl p-6 bg-white sm:h-[80vh] overflow-x-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-black">
              View Complaint
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Update the status for complaint{" "}
              <span className="font-medium">{info.uniqueToken}</span>
            </p>
          </div>

          <form method="dialog">
            <button className="btn btn-sm btn-ghost btn-circle">
              <X size={18} />
            </button>
          </form>
        </div>

        {/* Complaint details */}
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Complaint Details
          </h3>

          <div className="bg-gray-50 rounded-xl flex flex-col gap-2 p-3 shadow-sm">
            <div className="rounded-xl px-4 py-1 h-[120px] w-full flex justify-center">
              <img
                src={`${info.imageURL}`}
                alt="Complaint Image"
                className="h-full w-1/2 object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-lg text-gray-900">{info.title}</p>
              <p className="text-sm text-gray-600 mt-1 max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap  ">
                <span className="text-sm font-semibold text-gray-900">
                  Description:{" "}
                </span>{" "}
                {info.description}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="text-sm font-semibold text-gray-900">
                  Department:
                </span>{" "}
                {info.departmentName}{" "}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="text-sm font-semibold text-gray-900 ">
                  Status:
                </span>{" "}
                {info.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ViewComplaintModal;
