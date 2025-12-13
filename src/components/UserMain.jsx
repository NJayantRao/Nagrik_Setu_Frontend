import ComplaintCard from "./ComplaintCard";
import { FileText, FileClock, FileCheck, FileX, Plus } from "lucide-react";
import Complaints from "./Complaints";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserMain({ filed, inProgress, resolved, rejected, complaintList }) {
  const navigate= useNavigate()
  const cardInfo = [
    {
      bgcolor: "bg-[#2480c6]",
      text: "Filed",
      count: filed,
      icon: FileText,
      size: "text-2xl",
    },
    {
      bgcolor: "bg-[#F9A825]",
      text: "In-Progress",
      count: inProgress,
      icon: FileClock,
      size: "text-xl",
    },
    {
      bgcolor: "bg-[#8bc34a]",
      text: "Resolved",
      count: resolved,
      icon: FileCheck,
      size: "text-2xl",
    },
    {
      bgcolor: "bg-[#f54336]",
      text: "Rejected",
      count: rejected,
      icon: FileX,
      size: "text-2xl",
    },
  ];

  useEffect(() => {
    console.log(filed, inProgress, resolved, rejected);
    console.log(complaintList);
  }, [filed, inProgress, resolved, rejected, complaintList]);
  return (
    <div className="relative w-full h-screen p-4 bg-[#f2f3f5]">
      <div className="bg-[#1d4ed8] h-15  w-15 sm:hidden absolute z-50 right-10 bottom-[15vh] rounded-full flex justify-center items-center" onClick={()=>{
        navigate("/user/profile/complaints/Register")
      }}>
        <Plus size={50} strokeWidth={2.5} className="invert"/>
      </div>
      <div className="text-xl sm:text-3xl text-[#1E3A8A] mb-2 font-semibold px-2 tracking-tight">
        <h1>Complaint Insights</h1>
      </div>
      <div className=" flex gap-2 sm:gap-4 justify-evenly flex-nowrap">
        {cardInfo.map((ele, idx) => {
          return (
            <ComplaintCard
              key={idx}
              bgcolor={ele.bgcolor}
              text={ele.text}
              count={ele.count}
              icon={ele.icon}
              size={ele.size}
            />
          );
        })}
      </div>
      <div className="text-xl sm:text-3xl text-[#1E3A8A] mt-5 mb-3 font-semibold px-2 tracking-tight">
        <h1>Recent Complaints </h1>
      </div>
      <div className=" flex gap-2 justify-evenly flex-col">
        {complaintList
          .slice(-3)
          .reverse()
          .map((ele, idx) => {
            return (
              <Complaints
                key={idx}
                title={ele.title}
                desc={ele.description}
                status={ele.status}
                img={ele.imageURL}
              />
            );
          })}
      </div>
    </div>
  );
}

export default UserMain;
