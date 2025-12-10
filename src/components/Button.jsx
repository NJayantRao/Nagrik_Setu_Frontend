import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

function Button(props) {
  const { isLoginClicked, setIsLoginClicked } = useContext(UserDataContext);
  return (
    <button
      className="bg-amber-400 rounded-full w-30 h-10 text-xl hover:cursor-pointer text-black shadow-xl"
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
