import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { UserDataContext } from "../context/UserContext";

function Home() {
  const navigate = useNavigate();
  // const [isLoading,setIsLoading]= useState(false)

  // useEffect(()=>{
  //   const timer= setTimeout(() => {
  //   setIsLoading(true)
  // }, 2000);

  // return () => clearTimeout(timer)
  // },[])

  //  if(!isLoading){
  //   return(
  //     <Loader />
  //   )
  // }

  return (
    <div>
      <h1
        className="text-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
        onClick={(e) => {}}
      >
        Nagrik Setu
      </h1>
    </div>
  );
}
export default Home;
