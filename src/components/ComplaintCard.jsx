import { FileText, FileClock, FileCheck, FileX } from "lucide-react";

function ComplaintCard(props) {
  return (
    <div
      className={`h-[18vh] sm:h-[20vh] w-1/4 ${props.bgcolor} rounded-xl sm:rounded-2xl flex p-2 sm:p-4 text-[#FFF3E0] `}
    >
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex flex-col w-full h-full gap-2">
          <div className={`sm:${props.size} font-semibold`}>
            <h1 className="text-sm">{props.text}</h1>
          </div>

          <div className="font-semibold flex justify-around items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">{props.count}</h1>
            <div className="sm:hidden">
              <props.icon
                className="w-10 h-12 sm:w-20 md:h-20 lg:w-24 lg:h-24"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <props.icon
            className="w-10 h-12 sm:w-20 md:h-20 lg:w-24 lg:h-24 mt-auto"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;
