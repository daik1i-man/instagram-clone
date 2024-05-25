import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../database/firebase';

export const UserAuthContext = createContext();

export default function UserAuthProvider({ children }) {
    const [userStatus, setUserStatus] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const findUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserStatus(true);
                setUserDatas(user);
            }
            else {
                setUserStatus(false);
            }
            setLoading(false);
        })

        return () => findUser();
    }, [auth])

    return (
        <UserAuthContext.Provider value={{ userStatus, setUserStatus, loading, setLoading, userDatas, setUserDatas }}>
            {children}
        </UserAuthContext.Provider>
    )
}

