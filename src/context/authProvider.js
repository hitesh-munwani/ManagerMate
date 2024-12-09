import React, { createContext, useState } from "react";

//API
import { getUserProfile } from "../api";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [allLanguages, setAllLanguages] = useState([])
    const [activeLanguage, setactiveLanguage] = useState("")

    async function fetchProfile() {

        const params = {
            _id: user?.userInfo?._id
        }

        const result = await getUserProfile(params)

        if (result.status) {
            setProfile(result?.data?.body?.userDetail)

            return result?.data?.body?.userDetail
        }

        return null
    }

    return (
        <AuthContext.Provider
            value={{
                profile,
                setProfile,
                user,
                setUser,
                fetchProfile,
                activeLanguage,
                setactiveLanguage,
                allLanguages,
                setAllLanguages,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}