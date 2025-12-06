import { useNavigate } from "react-router-dom"


function Home(){
  const navigate= useNavigate()
  return(
    <div>
             <h1 className="text-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold" onClick={(e)=>{

             }}>Nagrik Setu</h1>

    </div>
  )
}

export default Home