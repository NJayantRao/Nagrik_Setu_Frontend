import React, { useEffect } from "react";
import { X, Clock, CircleCheckBig, XCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";

const UpdateStatusModal = ({ info, refresh }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  async function updateStatus() {
    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/admin/complaints/${info._id}/status/next`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        setIsLoading(false);
        notify(response.data.msg);
        document.getElementById("update_status_modal").close();
        navigate("/admin/complaints");
        refresh((prev) => !prev);
      }, 4000);

      // console.log(response.data);
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      setIsLoading(false);

      notify(error.response.data, "error");
      document.getElementById("update_status_modal").close();
    }
  }

  async function rejectStatus() {
    try {
      setIsRejected(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/admin/complaints/${info._id}/status/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        setIsRejected(false);
        notify(response.data.msg);
        document.getElementById("update_status_modal").close();
        navigate("/admin/complaints");
        refresh((prev) => !prev);
      }, 4000);
      // console.log(response.data);
    } catch (error) {
      //eslint-disable-next-line
      console.log(error);
      setIsLoading(false);

      notify(error.response.data, "error");
      document.getElementById("update_status_modal").close();
    }
  }

  return (
    <dialog id="update_status_modal" className="modal">
      <div className="modal-box max-w-xl rounded-2xl p-6 bg-white h-[80vh] overflow-x-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-black">
              Update Complaint Status
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
                {info.departmentName} <span className="mx-2">|</span>
                <span className="text-sm font-semibold text-gray-900">
                  Status:
                </span>{" "}
                {info.status}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 mt-4 px-4 py-2">
          <button
            className="btn text-white bg-[#e7000b] hover:bg-[#ed0b16] text-sm font-semibold rounded-xl hover:scale-105"
            onClick={() => {
              rejectStatus();
              // later: handleReject(info._id)
              // console.log("Rejected:", info._id);
            }}
          >
            <XCircle />
            {isRejected ? "Processing..." : "Reject Complaint"}
          </button>
          <button
            className="btn bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-semibold rounded-xl hover:scale-105"
            onClick={() => {
              updateStatus();
            }}
          >
            <CircleCheckBig />
            {isLoading ? "Processing..." : "Update Status"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateStatusModal;
