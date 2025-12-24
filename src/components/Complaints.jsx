import { FileText, FileClock, FileCheck, FileX } from "lucide-react";

function Complaints(props) {
  // const isMobile= window.innerWidth <768;
  const icons = {
    Filed: FileText,
    "In-Progress": FileClock,
    Resolved: FileCheck,
    Rejected: FileX,
  };

  const Icon = icons[props.status] || FileText;

  return (
    <div className="h-12 sm:h-17 max-w-[90vw] sm:max-w-[85vw] rounded-2xl p-2 bg-[#ffffffe1] flex items-center relative shadow-lg">
      <div>
        <img
          src={`${props.img}`}
          alt="nagrik"
          className="h-8 sm:h-12 w-10 sm:w-15 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col px-3 sm:px-5 sm:h-15">
        <div className="text-sm sm:text-lg font-semibold sm:font-bold truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[40vw]">
          <h2>{props.title}</h2>
        </div>
        <div className="text-xs sm:text-sm sm:font-medium truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[40vw]">
          <h4>{props.desc}</h4>
        </div>
      </div>
      <div className="flex gap-2 justify-end sm:justify-start items-center absolute right-5 sm:right-10 w-40">
        <div >
          <Icon size={40} strokeWidth={1.5} />
        </div>
        <div className="hidden sm:block font-semibold text-xl text-[#1F2937]">
          <h2>{props.status}</h2>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
