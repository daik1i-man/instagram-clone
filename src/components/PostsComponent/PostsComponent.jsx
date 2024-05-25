import React, { useContext } from 'react'
import { Button, Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { Bookmark, Heart, MessageCircle, SendHorizontal } from 'lucide-react'
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';

export default function PostsComponent({ userImg, userName, userPostURL, userPostsDescription, userid }) {
    const { userDatas } = useContext(UserAuthContext);
    return (
        <div className="max-w-[420px] mx-auto transform translate-y-10">
            <div className="flex space-x-4 justify-between items-center">
                <div className="my-4 flex space-x-4 items-center">
                    <Link to={`/${userid}`}>
                        <div className="">
                            <img className='w-[35px] h-[35px] border rounded-full' src={userImg} alt="" />
                        </div>
                    </Link>
                    <div className="">
                        <Link to={`/${userid}`} className='flex items-center space-x-8'>
                            <h1 className='text-base font-semibold'>{userName}</h1>
                            {userid !== userDatas.uid && (
                                <div className="">
                                    <p className='text-blue-700 cursor-pointer font-semibold text-[14px]'>Follow</p>
                                </div>
                            )}
                        </Link>
                        <p className='text-[10px] text-gray-500'>Suggested for you</p>
                    </div>
                </div>
            </div>
            <Card
                className="border-none relative"
                imgAlt=""
                imgSrc={userPostURL}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 pt-4">
                        <Heart className='w-7 h-7 items-center cursor-pointer' />
                        <MessageCircle className='transform -rotate-90 w-[25px] h-[25px] cursor-pointer' />
                        <SendHorizontal className='transform -rotate-[30deg] cursor-pointer  -translate-y-1 w-[25px] h-[25px]' />
                    </div>
                    <div className="">
                        <Bookmark />
                    </div>
                </div>
                <div className="translate-y-2"><p>828 likes</p></div>
                <div className="">
                    {userPostsDescription !== '' ? (
                    <div className='transition-transform text-start translate-y-4 flex items-center space-x-2'>
                        <h1 className='font-semibold'>{userName}</h1><p className='font-normal'>{userPostsDescription}</p>
                    </div>) : (
                        <div></div>
                    )}
                </div>
                <div className="translate-y-4">
                    <p className='cursor-pointer'>View all 4 comments</p>
                    <div className=""></div>
                    <div className="flex items-start w-[420px]">
                        <textarea className='w-full resize-none mt-2 focus:right-0 outline-none' type="text" placeholder='Add a comment...' />
                        <button className='text-blue-700 my-2'>Post</button>
                    </div>
                </div>
            </Card>
            <hr className='translate-y-4' />
        </div>
    )
}
