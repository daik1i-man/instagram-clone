import React, { useContext, useEffect, useState } from 'react'
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider'
import { collection, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { store } from '../../database/firebase';
import IsLoader from '../../isLoader/isLoader';
import { Button } from 'flowbite-react';
import { Link, Outlet, useParams } from 'react-router-dom';
import ProfileTabsLayout from '../../profileTabsLayout/profileTabsLayout';
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext';

export default function UserProfilePage() {
    const { id } = useParams();
    const { userDatas } = useContext(UserAuthContext);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { setOpenAboutUserAccountModal } = useContext(ActionsContext);

    if (!id) return null;

    useEffect(() => {
        setLoading(true);
        const queryUser = query(collection(store, "users"), where("userId", "==", id));
        const unsubscribe = onSnapshot(queryUser, (querySnap) => {
            let temp = {};
            querySnap.forEach((doc) => {
                temp = doc.data();
            })

            setData(temp);
        })

        setLoading(false);
        return () => unsubscribe;
    }, [])

    const Subscribe = async () => {

    }

    if (loading) {
        return <IsLoader />
    }

    return (
        <div className="">
            <div className='max-w-4xl border-b mx-auto pt-16  justify-center items-center'>
                <div className="w-full max-w-sm bg-white mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center w-[550px] space-x-14 pb-10">
                            <img className="w-40 h-40 rounded-full" src={data.imgUrl} alt="" />
                            <div className="px-2">
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{data.userName}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{data.fullName}</span>
                                <div className="flex space-x-4 my-2 ">
                                    <div className="flex items-center space-x-2">
                                        <h3 className='font-bold'>{data.postsTotal}</h3>
                                        <h4 className='font-normal'>posts</h4>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className='font-bold'>{data.followersTotal}</h3>
                                        <h4 className='font-normal'>followers</h4>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className='font-bold'>{data.followingTotal}</h3>
                                        <h4 className='font-normal'>following</h4>
                                    </div>
                                </div>
                                <div className="text-xs my-2">
                                    {data.userBiography}
                                </div>
                                <div className="">
                                    {data.userId === userDatas.uid ?
                                        (<div className="flex my-2 w-72 space-x-4">
                                            <Link to='/edit'>
                                                <Button
                                                    className='inline-flex items-center h-10 text-sm font-medium text-center text-gray-900 focus:ring-0 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100'
                                                >
                                                    Edit profile
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => setOpenAboutUserAccountModal(true)}
                                                className="h-10 font-medium text-gray-900 focus:ring-0 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                                            >
                                                About your account
                                            </Button>
                                        </div>) :
                                        (<div className="flex my-4 w-72 space-x-4">
                                            <Button
                                                className='inline-flex items-center h-9 px-6 text-sm font-medium text-center text-gray-50 focus:ring-0 focus:outline-none bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-600'
                                            >
                                                Follow
                                            </Button>
                                            <Button
                                                className="inline-flex items-center h-9 px-6 text-sm font-medium text-center text-gray-900 focus:ring-0 focus:outline-none bg-gray-200 rounded-lg border border-gray-100 hover:bg-gray-100"
                                            >
                                                Message
                                            </Button>
                                        </div>
                                        )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile Page Layout */}
            <div className="w-[800px] mx-auto justify-center">
                <ProfileTabsLayout />
                <Outlet />
            </div>
        </div >
    )
}

