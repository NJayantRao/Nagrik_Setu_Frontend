import React from "react";
import { Trash } from "lucide-react";

const DeleteButton = () => {
  return (
    <div className="bg-red-600 sm:bg-red-600 flex justify-center items-center p-2 hover:scale-95  rounded-xl">
      <div
        className="flex items-center gap-2 text-white font-semibold cursor-pointer sm:font-medium "
       onClick={()=>{
        // console.log("delete clicked!!!");
            
                    document.getElementById("delete_account_modal").showModal()
       }}
      >
        <Trash size={18} />
        Delete Account
      </div>
    </div>
  );
};

export default DeleteButton;
