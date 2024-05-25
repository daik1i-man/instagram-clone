import React, { createContext, useState } from 'react'

export const UserDocIdContext = createContext();

export default function UserDocIdContextComponent({ children }) {
    const [docDatas, setDocDatas] = useState([]);
    return (
        <UserDocIdContext.Provider value={{ docDatas, setDocDatas }}>
            {children}
        </UserDocIdContext.Provider>
    )
}
