import { Camera } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { CreatePostModalContext } from '../../Provider/ActionsContext/ActionsContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { store } from '../../database/firebase';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';
import { useParams } from 'react-router-dom';

export default function PostsLayoutTab() {
    const { id } = useParams();
    const { userDatas } = useContext(UserAuthContext);
    const { setOpenCreatePostModal } = useContext(CreatePostModalContext); // Correctly use context to open modal
    const [data, setData] = useState([]);

    useEffect(() => {
        const userPostsRef = query(collection(store, "posts"), where("userId", "==", id));
        const unsubscribe = onSnapshot(userPostsRef, (querySnap) => {
            const temp = [];
            querySnap.forEach((doc) => {
                temp.push(doc.data());
            });
            setData(temp);
        });

        return () => unsubscribe();
    }, [id]);

    const filteredPosts = data.filter(element => element.userId === id);

    return (
        <div className='w-[900px] justify-center h-full grid grid-cols-3 items-center transform translate-y-10'>
            {data.length ? (
                filteredPosts.length > 0 ? (
                    data.map((post, i) => (
                        <div key={i} className="flex space-x-2 my-1 mx-auto justify-center">
                            <img className='w-[295px] h-[300px]' src={post.postsURL} alt="" />
                        </div>
                    ))
                ) : (
                    <div className="translate-y-28">
                        <div className="w-[900px] items-center justify-center" onClick={() => setOpenCreatePostModal(true)}>
                            <label htmlFor="" className="">
                                <div className="text-center cursor-pointer w-full justify-center">
                                    <Camera strokeWidth={1} className='w-16 h-16 mx-auto' />
                                </div>
                            </label>
                            <div className="text-center space-y-5">
                                <h1 className='text-3xl font-black'>Share Photos</h1>
                                <p className='text-[14px]'>When you share photos, they will appear on your profile.</p>
                                <button className='text-blue-700' onClick={() => setOpenCreatePostModal(true)}>Share your first photo</button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="translate-y-28">
                    <div className="w-[900px] items-center justify-center">
                        <label htmlFor="" className="">
                            <div className="text-center cursor-pointer w-full justify-center">
                                <Camera strokeWidth={1} className='w-16 h-16 mx-auto' />
                            </div>
                        </label>
                        <div className="text-center space-y-5">
                            <h1 className='text-3xl font-black'>No posts yet</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
