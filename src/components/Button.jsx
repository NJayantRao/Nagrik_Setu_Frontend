import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

function Button() {
  const { isLoginClicked, setIsLoginClicked } = useContext(UserDataContext);
  return (
    <button
      className="bg-amber-400 rounded-xl sm:rounded-full w-20 sm:w-30 h-8 sm:h-10 text-lg sm:text-xl hover:cursor-pointer text-black shadow-xl "
      onClick={(e) => {
        e.stopPropagation();
        setIsLoginClicked(!isLoginClicked);
      }}
    >
      Login
    </button>
  );
}

export default Button;
