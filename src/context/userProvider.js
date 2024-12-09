import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = (props) => {

    const [instituteUser, setInstituteUser] = useState(false)

    return (
        <UserContext.Provider
            value={{
                instituteUser,
                setInstituteUser,
            }}>
            {props.children}
        </UserContext.Provider>
    )
}