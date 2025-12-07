import LeftSection from "./LeftSection"

function Topbar(){
    return(
        <div className="h-25 w-full bg-[#5B21B6] flex justify-between  items-center shadow-xl text-xl font-bold text-gray-300">
            <LeftSection />
            <div className="text-2xl font-bold text-[#d0d4db] hover:cursor-pointer relative dropdown">Civilian Dashboard</div>
            <div className="flex gap-5 mr-2 p-2 ">
                <div className="hover:cursor-pointer relative dropdown"><h2>Help</h2></div>
                <div className="hover:cursor-pointer relative dropdown"><h2>Contact Us</h2></div>
            </div>
        </div>
    )
}

export default Topbar