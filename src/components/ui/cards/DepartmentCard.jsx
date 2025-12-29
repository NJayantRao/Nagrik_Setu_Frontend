import {
  Building2,
  Users,
  FileText,
  MoreHorizontal,
  CheckCircle,
  Ellipsis,
  Trash2,
} from "lucide-react";
import DepartmentAction from "../../ui/dropdowns/DepartmentAction";
import axios from "axios";
import { notify } from "../../../utils/notify";

const DepartmentCard = ({ department, refresh }) => {
  async function handleDelete() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.delete(
        `${import.meta.env.VITE_LOCAL_URL}/admin/department/${department._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notify("Department deleted", "error");
      refresh((prev) => !prev);

      // document.getElementById("delete_complaint_modal").close();
    } catch (error) {
      //eslint-disable-next-line
      console.error(error);
      // console.log("not deleted");

      notify("Failed to delete complaint", "error");
    }
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Icon / Avatar */}
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Building2 size={22} />
          </div>

          {/* Department Name */}
          <div>
            <h3 className="font-semibold text-lg">{department.name}</h3>
          </div>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" size={30} />
          <Trash2
            className="text-red-500 cursor-pointer"
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
          {/* <DepartmentAction departmentId={department._id}/> */}
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Desc.:</span>
          {department.description}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
