import {
  Eye,
  Pencil,
  Clock,
  Loader2,
  CheckCircle,
  XCircle,
  Trash2,
  Ellipsis,
} from "lucide-react";

const ComplaintActionDropdown = ({ info }) => {
  return (
    <div className="dropdown  dropdown-end">
      {/* Trigger */}
      <div
        tabIndex={0}
        role="button"
        className="cursor-pointer text-gray-500 hover:text-gray-700"
      >
        <Ellipsis />
      </div>

      {/* Dropdown */}
      <div
        tabIndex={0}
        className="dropdown-content z-50 w-40 rounded-xl bg-white shadow-lg border border-gray-100 text-center"
      >
        <ul className="menu p-2 text-sm text-gray-800">
          {/* Primary actions */}
          <li>
            <button
              className="btn btn-ghost hover:bg-blue-100/50 hover:shadow-sm rounded-lg border-0 focus-visible:none"
              onClick={() => document.getElementById("view_modal").showModal()}
            >
              <Eye size={18} /> View Details
            </button>
          </li>

          <li>
            <button
              className="btn btn-ghost hover:bg-blue-100/50 hover:shadow-sm rounded-lg border-0 focus-visible:none"
              onClick={() =>
                document.getElementById("update_status_modal").showModal()
              }
            >
              <Pencil size={18} /> Update Status
            </button>
          </li>

          <div className="my-2 border-t" />

          {/* Destructive action */}
          <li>
            <button
              className="flex items-center gap-3 rounded-lg text-red-600 hover:bg-red-50"
              onClick={() => {
                document.getElementById("delete_complaint_modal").showModal();
              }}
            >
              <Trash2 size={18} /> Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ComplaintActionDropdown;
