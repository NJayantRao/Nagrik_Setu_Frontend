import Button  from "./Button"

function RightSection(){
    return(
        <div className=" flex justify-around items-center">
           <div><h1>Home</h1></div>
            <div><h1>Report Issue</h1></div>
            <div><h1>Track Issue</h1></div>
            <div><h1>Help</h1></div>
            <div><h1>Contact</h1></div>
            <div><Button /></div>
        </div>
    )
}

export default RightSection