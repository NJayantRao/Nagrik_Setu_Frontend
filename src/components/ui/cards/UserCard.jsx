import { Mail, Phone, CheckCircle } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
            {user.initials}
          </div>

          {/* Name */}
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
          </div>
        </div>

        {/* Status + menu */}
        <div className="flex items-center gap-2">
          {user.verified && (
            <CheckCircle className="text-green-500" size={18} />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={16} /> {user.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} /> {user.phone}
        </div>
        <div className="flex items-center gap-2">Token: {user.address}</div>
      </div>

      <hr className="my-4" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
          {user.status}
        </span>
        <span className="text-sm text-gray-500">
          {user.complaints} complaints
        </span>
      </div>
    </div>
  );
};

export default UserCard;
