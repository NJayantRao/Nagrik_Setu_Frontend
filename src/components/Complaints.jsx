import { FileText,FileClock,FileCheck,FileX } from "lucide-react"

function Complaints(){
    return(
        <div className="h-17 max-w-[85vw] rounded-2xl p-2 bg-[#ffffffe1] flex items-center relative shadow-lg">
            <div >
                <img src='/nagrik-setu.svg' alt="nagrik" className="h-12 w-15 object-cover"/>
            </div>
            <div className="flex flex-col px-5 h-15">
                <div className="text-lg font-bold"><h2>Title</h2></div>
                <div className="text-sm font-medium"><h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, dolorum.</h4></div>
            </div>
            <div className="flex gap-2 justify-center items-center absolute right-10 w-40">
                <div><FileText size={40} absoluteStrokeWidth/></div>
                <div className="font-semibold text-xl text-[#1F2937]"><h2>Filed</h2></div>
            </div>
        </div>
    )
}

export default Complaints