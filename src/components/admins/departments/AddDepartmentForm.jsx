import { useState } from "react";
import { Building2, X } from "lucide-react";
import axios from "axios";
import { notify } from "../../../utils/notify";

function AddDepartmentModal({ refresh }) {
  const [deptName, setDeptName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deptName || !description) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));

      await axios.post(
        `${import.meta.env.VITE_LOCAL_URL}/admin/department/register`,
        {
          name: deptName,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      notify("Department Added Successfully", "success");
      setDeptName("");
      setDescription("");
      refresh((prev) => !prev);

      document.getElementById("add_department_modal").close();
    } catch (error) {
      // console.log(error);
      notify("Failed to add department");
    }
  };

  return (
    <>
      {/* Modal */}
      <dialog id="add_department_modal" className="modal">
        <div className="modal-box max-w-md p-0 bg-transparent shadow-none">
          {/* Card */}
          <div className="bg-white rounded-3xl border border-blue-200 shadow-xl p-8 relative">
            {/* Close Button */}
            <button
              onClick={() =>
                document.getElementById("add_department_modal").close()
              }
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold">Add Department</h2>
              <p className="text-gray-500 text-sm">
                Register a new government department
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Department Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter department description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-70 cursor-pointer"
              >
                {loading ? "Adding..." : "Add Department"}
              </button>
            </form>
          </div>
        </div>

        {/* Backdrop close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddDepartmentModal;
