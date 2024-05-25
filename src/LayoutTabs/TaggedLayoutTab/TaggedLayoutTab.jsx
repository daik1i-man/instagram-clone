import { Camera } from 'lucide-react'
import React from 'react'

export default function TaggedLayoutTab() {

    return (
        <div className='w-full h-full justify-center items-center transform translate-y-28'>
            <div className="w-[900px] items-center justify-center">
                <label htmlFor="dropzone-file" className="">
                    <div className="text-center w-full justify-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14 mx-auto my-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    </div>
                </label>
                <div className="text-center space-y-5">
                    <h1 className='text-3xl font-black'>Photos of you</h1>
                    <p className='text-[14px]'>When people tag you in photos, they'll appear here.</p>
                </div>
            </div>
        </div>
    )
}
