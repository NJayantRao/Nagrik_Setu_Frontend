import ImageAvatars from "./ImageAvatar"
import LeftSection from "./LeftSection"
import BackgroundLetterAvatars from "./TextAvatar"

function Topbar(){
    return(
        <div className="h-15 w-full bg-[#1D4ED8] flex justify-between  items-center shadow-xl text-xl font-bold text-gray-300">
            <div className="w-1/5 flex justify-center gap-1 items-center">
                <img src="https://res.cloudinary.com/dpwqlb3d7/image/upload/v1764314433/My%20Brand/Gemini_Generated_Image_o5l8fro5l8fro5l8_s8srd9.png" alt="Nagrik setu" className="h-12 w-12 rounded-full"/>
                <div className="hover:cursor-pointer relative dropdown text-lg">
                <h1>Nagrik Setu</h1>
            </div>
            </div>
            <div className="text-2xl font-bold text-[#d0d4db] hover:cursor-pointer relative dropdown">Dashboard</div>
            <div className="flex gap-5 mr-2 p-2 ">
                <div className="hover:cursor-pointer relative dropdown text-lg"><h2>Hi, Rahul Sharma</h2></div>
                <div className="hover:cursor-pointer relative dropdown">
                    <BackgroundLetterAvatars string={"Rahul Sharma"}/>
                    {/* <ImageAvatars /> */}
                </div>
            </div>
        </div>
    )
}

export default Topbar