import React from "react";
import axios from "axios";
import { notify } from "../../utils/notify";

const DeleteComplaintModal = ({ info }) => {
  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.delete(
        `${import.meta.env.VITE_LOCAL_URL}/admin/complaints/${info._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notify("Complaint deleted successfully", "error");

      document.getElementById("delete_complaint_modal").close();
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
      notify("Failed to delete complaint", "error");
    }
  };

  return (
    <dialog id="delete_complaint_modal" className="modal">
      <div className="modal-box bg-white text-gray-800 shadow-xl rounded-2xl">
        {/* Title */}
        <h3 className="font-bold text-lg sm:text-xl text-red-600">
          Delete Complaint
        </h3>

        {/* Warning */}
        <p className="py-4">
          This will permanently delete the selected complaint and all its
          associated data from the system.
          <br />
          <span className="font-semibold text-red-500">
            This action cannot be undone.
          </span>
        </p>

        {/* Actions */}
        <div className="modal-action flex gap-3">
          {/* Cancel */}
          <form method="dialog">
            <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl">
              Cancel
            </button>
          </form>

          {/* Confirm Delete */}
          <button
            className="btn bg-red-600 hover:bg-red-700 text-white rounded-xl"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteComplaintModal;
