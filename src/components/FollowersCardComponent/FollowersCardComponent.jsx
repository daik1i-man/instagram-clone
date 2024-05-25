import { Button } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function FollowersCardComponent({ userUid, userName, userImgUrl }) {
    let navigate = useNavigate();

    const NavigateHandler = () => {
        navigate(`/${userUid}/`);
    }

    return (
        <div className=''>
            <div className="">
                <div className="flex items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full">
                            <img
                                onClick={NavigateHandler}
                                className="cursor-pointer w-full h-full rounded-full"
                                src={userImgUrl}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <Link to={`/${userUid}/`}>
                                <span className="font-semibold text-[14px]">{userName}</span>
                            </Link>
                            <span className="text-gray-400 w-[200px] text-[10px]">Suggested for you</span>
                        </div>
                    </div>
                    <div className="">
                        <Button className='text-blue-700 border-none'>
                            Follow
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
