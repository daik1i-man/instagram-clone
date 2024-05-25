import { Camera } from 'lucide-react'
import React, { useContext } from 'react'
import { CreatePostModalContext } from '../../Provider/ActionsContext/ActionsContext'

export default function ReelsLayoutTab() {
    const { setOpenCreatePostModal } = useContext(CreatePostModalContext);
    return (
        <div className='w-full h-full justify-center items-center transform translate-y-28'>
            <div className="w-[900px] items-center justify-center" onClick={() => setOpenCreatePostModal(true)}>
                <label htmlFor="" className="">
                    <div className="text-center w-full cursor-pointer justify-center ">
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
}
