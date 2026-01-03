import LeftSection from "../common/LeftSection";
import Button from "../../components/ui/buttons/Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import {
  Menu,
  X,
  FilePlusCorner,
  UserRoundPen,
  FileSearchCorner,
  MessageCircleQuestionMark,
} from "lucide-react";

function Navbar() {
  const { isLoginClicked, setIsLoginClicked } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#1D4ED8] w-full h-12 sm:h-20 px-2 py-3 flex items-center justify-between sm:justify-around shadow-xl text-gray-300 text-xl font-bold sticky top-0 z-50">
      <div className="sm:hidden flex gap-3">
        <Menu
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-28 bg-white shadow-xl z-50 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300  px-2 py-5`}
      >
        <div className="flex justify-end ">
          <X
            strokeWidth={1.5}
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 text-gray-700 text-sm items-start mt-5">
          <div
            className="whitespace-nowrap rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
            onClick={() => {
              navigate("/user/profile/complaints/Register");
            }}
          >
            <FilePlusCorner size={14} strokeWidth={1.5} />
            <h1 className="font-medium">Report Issue</h1>
          </div>

          <div
            className="whitespace-nowrap rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
            onClick={() => {
              navigate("/user/profile/complaints");
            }}
          >
            <FileSearchCorner size={14} strokeWidth={1.5} />
            <h1 className="font-medium">Track Issue</h1>
          </div>

          <div className="whitespace-nowrap rounded-lg hover:bg-gray-200 transition flex items-center gap-1">
            <MessageCircleQuestionMark size={14} strokeWidth={1.5} />
            <h1 className="font-medium">Help</h1>
          </div>

          <div className="whitespace-nowrap rounded-lg hover:bg-gray-200 transition flex items-center gap-1">
            <UserRoundPen size={14} strokeWidth={1.5} />
            <h1 className="font-medium">Contact Us</h1>
          </div>
        </div>
      </div>
      <LeftSection />
      <div
        className={`hover:cursor-pointer relative dropdown hidden sm:block`}
        onClick={(e) => {
          navigate("/");
        }}
      >
        <h1>Home</h1>
      </div>
      <div
        className="hover:cursor-pointer relative dropdown hidden sm:block"
        onClick={() => {
          navigate("/user/profile/complaints/Register");
        }}
      >
        <h1>Report Issue</h1>
      </div>
      <div
        className="hover:cursor-pointer relative dropdown hidden sm:block"
        onClick={() => {
          navigate("/user/profile/complaints");
        }}
      >
        <h1>Track Issue</h1>
      </div>
      <div className="hover:cursor-pointer relative dropdown hidden sm:block">
        <h1>Help</h1>
      </div>
      <div className="hover:cursor-pointer relative dropdown hidden sm:block">
        <h1>Contact Us</h1>
      </div>
      <div className=" sm:mr-2 relative ">
        <Button />
        <div
          className="sm:w-60 w-40 absolute bg-gray-200 right-0 text-sm sm:text-lg flex flex-col gap-2 rounded-md shadow-xl p-1 sm:p-5 text-black hover:cursor-pointer z-50"
          style={{ display: isLoginClicked ? "block" : "none" }}
        >
          <div
            className=" hover:bg-gray-100 px-3 py-1"
            onClick={(e) => {
              navigate("/user/login");
            }}
          >
            User Login
          </div>
          <div
            className=" hover:bg-gray-100 px-3 py-1"
            onClick={(e) => {
              navigate("/admin/login");
            }}
          >
            Admin Login
          </div>
          <div
            className=" hover:bg-gray-100 px-3 py-1"
            onClick={() => {
              navigate("/staff/login");
            }}
          >
            Staff Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
