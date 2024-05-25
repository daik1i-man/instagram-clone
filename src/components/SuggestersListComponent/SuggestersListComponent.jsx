import React, { useContext, useEffect, useState } from 'react'
import { store } from '../../database/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider'
import { FollowersDatasContext } from '../../Provider/FollowersDatasContext/FollowersDatasContext'
import FollowersCardComponent from '../FollowersCardComponent/FollowersCardComponent'
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext'
import IsLoader from '../../isLoader/isLoader';

export default function SuggestersListComponent() {
    const { userDatas } = useContext(UserAuthContext);
    const { followersDatas, setFollowersDatas } = useContext(FollowersDatasContext);
    const { setOpenFollowersModal } = useContext(ActionsContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const queryUsers = query(collection(store, "users"), where("userId", "!=", userDatas.uid));
        const unsubscribe = onSnapshot(queryUsers, (querySnap) => {
            const temp = [];
            querySnap.forEach((doc) => {
                temp.push(doc.data());
            })
            setFollowersDatas(temp);
        })
        setLoading(false);
        return () => unsubscribe;
    }, [])

    if (loading) {
        return <IsLoader />
    }

    return (
        <div className='w-[280px] fixed top-24 right-[125px] justify-center px-2'>
            <div className="flex items-center justify-between w-[280px]">
                <h1 className='font-medium text-gray-600'>Suggested for you</h1>
                <button className='text-blue-700 border-none focus:ring-0' onClick={() => setOpenFollowersModal(true)}>
                    See all
                </button>
            </div>
            <div className="my-8 space-y-5">
                {followersDatas.slice(0, 5).map((user, i) => (
                    <FollowersCardComponent
                        key={i}
                        userUid={user.userId}
                        userEmail={user.email}
                        userName={user.userName}
                        userFullName={user.fullName}
                        userImgUrl={user.imgUrl}
                    />
                ))}
            </div>
        </div>
    )
}
