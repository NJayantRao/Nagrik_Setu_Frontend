import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";
const DeleteModal = () => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
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
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="delete_account_modal" className="modal">
        <div className="modal-box bg-white text-gray-800 shadow-xl rounded-2xl">
          <h3 className="font-bold text-lg sm:text-xl text-red-600">
            Delete Account
          </h3>

          <p className="py-4">
            Deleting your account will permanently remove your profile and all
            related records from the Nagrik Setu system. <br />
            <span className="font-semibold text-red-500">
              This action is irreversible.
            </span>
          </p>

          <div className="modal-action flex gap-3">
            {/* Cancel */}
            <form method="dialog">
              <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 outline-none rounded-xl">
                Cancel
              </button>
            </form>

            {/* Confirm Delete */}
            <button
              className="btn bg-red-600 hover:bg-red-700 text-white rounded-xl"
              onClick={(e) => {
                console.log("Account deleted");
                handleDelete(e);
                document.getElementById("delete_account_modal").close();
              }}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;
