import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import IsLoader from '../isLoader/isLoader';
import { Bookmark, Clapperboard, ContactRound, Grid3X3 } from 'lucide-react';
import { UserAuthContext } from '../Provider/userAuthProvider/userAuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { store } from '../database/firebase';
import { CreatePostModalContext } from '../Provider/ActionsContext/ActionsContext';


export default function ProfileTabsLayout() {
    const { id } = useParams();
    const { userDatas, setLoading, loading } = useContext(UserAuthContext);
    const [data, setData] = useState({});

    const { switchPage, Switcher } = useContext(CreatePostModalContext);

    useEffect(() => {
        setLoading(true);
        const queryUser = query(collection(store, "users"), where("userId", "==", userDatas.uid));
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

    if (loading) {
        return <IsLoader />
    }

    return (
        <>
            {/* Layout Section */}
            <div className="mt-5 w-[900px] justify-center items-center">
                <ul className="flex justify-center space-x-10 mx-auto">
                    <Link to={`/${id}`}>
                        <div onClick={() => Switcher(1)}>
                            <li className={`me-1 flex items-center ${switchPage === 1 ? 'border-b-2 border-gray-900' : ''}`}>
                                <Grid3X3 className='w-3 h-3' />
                                <p className="inline-block p-4 text-gray-900 uppercase text-xs">Posts</p>
                            </li>
                        </div>
                    </Link>
                    <Link to={`/${id}/reels`}>
                        <div onClick={() => Switcher(2)}>
                            <li className={`me-1 flex items-center ${switchPage === 2 ? 'border-b-2 border-gray-900' : ''}  text-gray-500`}>
                                <Clapperboard className='w-3 h-3' />
                                <p className="inline-block p-4 uppercase text-xs">Reels</p>
                            </li>
                        </div>
                    </Link>
                    <Link to={`/${id}/saved`}>
                        <div onClick={() => Switcher(3)}>
                            <li className={`me-1 flex items-center ${switchPage === 3 ? 'border-b-2 border-gray-900' : ''}  text-gray-500`}>
                                <Bookmark className='w-3 h-3' />
                                <p className="inline-block p-4 uppercase text-xs">Saved</p>
                            </li>
                        </div>
                    </Link>
                    <Link to={`/${id}/tagged`}>
                        <div onClick={() => Switcher(4)}>
                            <li className={`me-1 flex items-center ${switchPage === 4 ? 'border-b-2 border-gray-900' : ''} text-gray-500`}>
                                <ContactRound className='w-3 h-3' />
                                <p className="inline-block p-4 uppercase text-xs">Tagged</p>
                            </li>
                        </div>
                    </Link>
                </ul>
            </div>
        </>
    )
}
