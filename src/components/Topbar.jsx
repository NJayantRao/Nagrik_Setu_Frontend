import ImageAvatars from "./ImageAvatar"
import LeftSection from "./LeftSection"
import BackgroundLetterAvatars from "./TextAvatar"

function Topbar({name}){
    return(
        <div className="h-15 w-full bg-[#2a674b] flex justify-between  items-center shadow-xl text-xl font-bold text-[#d6f5e9]">
            <div className="w-1/5 flex justify-center gap-2 items-center">
                <img src="https://res.cloudinary.com/dpwqlb3d7/image/upload/v1764314433/My%20Brand/Gemini_Generated_Image_o5l8fro5l8fro5l8_s8srd9.png" alt="Nagrik setu" className="h-12 w-12 rounded-full"/>
                <div className="hover:cursor-pointer relative dropdown text-lg">
                <h1>Nagrik Setu</h1>
            </div>
            </div>
            <div className="text-2xl font-bold text-[#d6f5e9] hover:cursor-pointer relative dropdown">Dashboard</div>
            <div className="flex gap-3 mr-2 p-2  items-center">
                <div className="hover:cursor-pointer relative dropdown text-lg"><h2>Hi, {name}</h2></div>
                <div className="hover:cursor-pointer  ">
                    <BackgroundLetterAvatars string={name}/>
                    {/* <ImageAvatars /> */}
                </div>
            </div>
        </div>
    )
}

export default Topbar