import React, { createContext, useState } from 'react'

export const FollowStateContext = createContext();

export default function FollowStateContextComponent({ children }) {
    const [data, setData] = useState([]);
    return (
        <FollowStateContext.Provider value={{ data, setData }}>
            {children}
        </FollowStateContext.Provider>
    )
}
