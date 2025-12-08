import { FileText,FileClock,FileCheck,FileX } from "lucide-react"

function ComplaintCard(props){
    return(
        <div className={`h-[20vh] w-1/4 ${props.bgcolor} rounded-2xl flex p-4 text-[#FFF3E0] `}>
            <div className="flex flex-col w-full h-full gap-4">
                <div className={`${props.size} font-semibold`}><h1>{props.text}</h1></div>
                <div className="text-4xl font-semibold"><h1>{props.count}</h1></div>
            </div>
            <div><props.icon size={90} strokeWidth={1} /></div>
        </div>
    )
}

export default ComplaintCard
