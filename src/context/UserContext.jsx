import { createContext, useState } from "react"

export const UserDataContext= createContext()

function UserContext(props){
    const [isLoginClicked,setIsLoginClicked]= useState(false)
    return(
        <div>
            <UserDataContext.Provider value={{isLoginClicked,setIsLoginClicked}}>
                {props.children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext