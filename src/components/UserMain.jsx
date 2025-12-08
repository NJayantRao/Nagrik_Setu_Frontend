import ComplaintCard from "./ComplaintCard"
import { FileText,FileClock,FileCheck,FileX } from "lucide-react"
import Complaints from "./Complaints"


function UserMain(){
    const cardInfo= [
        {
            bgcolor:"bg-[#2480c6]",
            text:"Filed",
            count:0,
            icon:FileText,
            size:"text-2xl",
        },
         {
            bgcolor:"bg-[#F9A825]", 
            text:"In-Progress",
            count:0,
            icon:FileClock,
            size:"text-xl",
        },
         {
            bgcolor:"bg-[#8bc34a]",
            text:"Resolved",
            count:0,
            icon:FileCheck,
            size:"text-2xl",
        },
         {
            bgcolor:"bg-[#f54336]",
            text:"Rejected",
            count:0,
            icon:FileX,
            size:"text-2xl",
        },
    ]

    const recents= [
        {
            bgcolor:"bg-[#2480c6]",
            text:"Filed",
            count:0,
            icon:FileText,
            size:"text-2xl",
        },
         {
            bgcolor:"bg-[#F9A825]", 
            text:"In-Progress",
            count:0,
            icon:FileClock,
            size:"text-xl",
        },
         {
            bgcolor:"bg-[#8bc34a]",
            text:"Resolved",
            count:0,
            icon:FileCheck,
            size:"text-2xl",
        },
         {
            bgcolor:"bg-[#f54336]",
            text:"Rejected",
            count:0,
            icon:FileX,
            size:"text-2xl",
        },
    ]
    return(
        <div className="relative w-full h-screen p-4">
            <div className="text-3xl text-[#1E3A8A] mb-2 font-bold px-2 tracking-tight">
                <h1>Complaint Insights</h1>
            </div>
            <div className=" flex gap-4 justify-evenly flex-nowrap">
                {
                    cardInfo.map((ele,idx)=>{
                        return <ComplaintCard key={idx} bgcolor={ele.bgcolor} text={ele.text} count={ele.count} icon={ele.icon} size={ele.size}/>
                    })
                }
            </div>
            <div className="text-3xl text-[#1E3A8A] mt-5 mb-3 font-bold px-2 tracking-tight">
                <h1>Recent Complaint </h1>
            </div>
            <div className=" flex gap-2 justify-evenly flex-col">
                <Complaints />
                <Complaints />
                <Complaints />
            </div>
        </div>
    )
}

export default UserMain