import { FileText } from "lucide-react";

function AdminStatCard(props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-gray-500 text-sm sm:text-xl font-semibold p-1">
        {props.title}
      </p>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">56</h2>
        </div>
        <div className={`p-2 ${props.bgColor} rounded-xl ${props.textColor}`}>
          <props.icon size={36} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export default AdminStatCard;
