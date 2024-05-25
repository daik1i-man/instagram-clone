import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../database/firebase';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { UserDocIdContext } from '../../Provider/UserDocIdContext/UserDocIdContext';
import UserCardComponent from '../UserCardComponent/UserCardComponent';
import IsLoader from '../../isLoader/isLoader';

export default function Header() {
    const { userDatas } = useContext(UserAuthContext);
    const { docDatas, setDocDatas } = useContext(UserDocIdContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const queryUsers = query(collection(store, "users"), where("userId", "==", userDatas.uid));
        const unsubscribe = onSnapshot(queryUsers, (querySnap) => {
            let temp = '';
            querySnap.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                temp = data;
            })
            setDocDatas(temp);
        })
        setLoading(false);
        return () => unsubscribe;
    }, [])

    if (loading) {
        return <IsLoader />
    }

    return (
        <div>
            <nav className="bg-white w-[1280px] fixed h-24 right-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="w-full md:block items-center md:w-auto" id="navbar-default">
                        <UserCardComponent
                            userUid={docDatas.userId}
                            userName={docDatas.userName}
                            userFullName={docDatas.fullName}
                            userEmail={docDatas.email}
                            userImgUrl={docDatas.imgUrl}
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
}
