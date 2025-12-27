import { Search } from "lucide-react";
import BackgroundLetterAvatars from "../components/TextAvatar";

const SearchBar = () => {
  return (
    <div className="  bg-[#eef2f7] p-2 shadow-lg flex items-center justify-between backdrop-blur-md">
      <div className="bg-[#f7f9fa] p-3 rounded-xl flex items-center shadow-lg w-3/4">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search your complaints,users,staff..."
          className="w-full outline-none text-lg"
        />
      </div>
      <div className="flex gap-4 p-2 items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-[#475569]">Admin Account</h2>
          <p className="text-[#1e293b] font-semibold">Rahul Sharma</p>
        </div>
        <BackgroundLetterAvatars string={"Rahul Sharma"} />
      </div>
    </div>
  );
};

export default SearchBar;
