import { createContext, useState } from "react";

export const UserDataContext = createContext();

function UserContext(props) {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [uniqueToken, setUniqueToken] = useState("");
  const [id, setId] = useState("");
  return (
    <div>
      <UserDataContext.Provider
        value={{
          isLoginClicked,
          setIsLoginClicked,
          setName,
          setEmail,
          setPassword,
          setPhone,
          setAddress,
          setUniqueToken,
          name,
          email,
          password,
          address,
          phone,
          uniqueToken,
          id,
          setId,
        }}
      >
        {props.children}
      </UserDataContext.Provider>
    </div>
  );
}

export default UserContext;
