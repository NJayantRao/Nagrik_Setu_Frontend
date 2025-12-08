import { Search, Bell, User, FileText } from "lucide-react";

function MyComplaints() {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 ">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-[#1E3A8A]">
          My Complaints
        </h1>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="bg-white p-3 rounded-xl flex items-center shadow-sm">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search your complaints"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold p-1">Total Complaints</p>
              <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">56</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Filed</p>
               <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">56</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">In Progress</p>
               <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">56</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Resolved</p>
               <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">56</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg font-semibold">Rejected</p>
               <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-semibold">56</h2></div>
                <FileText size={36} strokeWidth={1.5}/>
              </div>
            </div>

          </div>

          {/* Recent Complaints Table */}
          <div className="bg-white rounded-xl p-6 h-[40vh] shadow-sm relative overflow-y-auto  scrollbar-hide">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 ">
                  <th className="text-left pb-3">Complaint ID</th>
                  <th className="text-left pb-3">Title</th>
                  <th className="text-left pb-3 ">Department</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-left pb-3">Actions</th>
                </tr>
              </thead>

              <tbody className="space-y-3">
                {[
                  {
                    id: "CIV-823491",
                    desc: "Disturb weak",
                    type: "Road",
                    status: "Resolved",
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    id: "CIV-912830",
                    desc: "Gaosanting",
                    type: "Water",
                    status: "In Progress",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    id: "CIV-823104",
                    desc: "Pecoam",
                    type: "Garbage",
                    status: "Submitted",
                    color: "bg-orange-100 text-orange-700",
                  },
                  {
                    id: "CIV-482301",
                    desc: "Door entry",
                    type: "Electricity",
                    status: "Resolved",
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    id: "CIV-823491",
                    desc: "Disturb weak",
                    type: "Road",
                    status: "Resolved",
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    id: "CIV-912830",
                    desc: "Gaosanting",
                    type: "Water",
                    status: "In Progress",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    id: "CIV-823104",
                    desc: "Pecoam",
                    type: "Garbage",
                    status: "Submitted",
                    color: "bg-orange-100 text-orange-700",
                  },
                  {
                    id: "CIV-482301",
                    desc: "Door entry",
                    type: "Electricity",
                    status: "Resolved",
                    color: "bg-green-100 text-green-700",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-t text-gray-700">
                    <td className="py-3">{item.id}</td>
                    <td>{item.desc}</td>
                    <td>{item.type}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
  );
}

export default MyComplaints