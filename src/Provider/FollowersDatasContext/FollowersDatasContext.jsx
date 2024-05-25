import React, { createContext, useState } from 'react'

export const FollowersDatasContext = createContext();

export default function FollowersDatasContextComponent({ children }) {
    const [followersDatas, setFollowersDatas] = useState([]);
    return (
        <FollowersDatasContext.Provider value={{ followersDatas, setFollowersDatas }}>
            {children}
        </FollowersDatasContext.Provider>
    )
}
