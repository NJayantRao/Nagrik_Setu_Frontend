import { useEffect, useState } from "react";
import { Building2, X } from "lucide-react";
import axios from "axios";
import { notify } from "../../utils/notify";

function UpdateDepartmentModal({ department, info }) {
  const [deptName, setDeptName] = useState(department.name);
  const [description, setDescription] = useState(department.description);
  const [loading, setLoading] = useState(false);

  // Prefill form when department changes
  useEffect(() => {
    // console.log(department);
    // console.log(info);

    if (department) {
      setDeptName(department.name || "");
      setDescription(department.description || "");
    }
  }, [department]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!deptName || !description) {
      alert("All fields are required");
      return;
    }

    // console.log(department);
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));

      await axios.put(
        `${import.meta.env.VITE_LOCAL_URL}/admin/departments/${info}`,
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
      notify("Department Updated Successfully", "success");
      document.getElementById("update_department_modal").close();
    } catch (error) {
      //   console.error(error);
      notify("Failed to update department");
    }
  };

  return (
    <dialog id="update_department_modal" className="modal">
      <div className="modal-box max-w-md p-0 bg-transparent shadow-none">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-blue-200 shadow-xl p-8 relative">
          {/* Close */}
          <button
            onClick={() =>
              document.getElementById("update_department_modal").close()
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
            <h2 className="text-3xl font-bold">Update Department</h2>
            <p className="text-gray-500 text-sm">
              Modify department information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Department Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Department"}
            </button>
          </form>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default UpdateDepartmentModal;
