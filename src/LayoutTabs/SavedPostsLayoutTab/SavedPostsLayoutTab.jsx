import React from 'react'

export default function SavedPostsLayoutTab() {
    return (
        <div className='w-full h-full justify-center items-center transform translate-y-28'>
            <div className="w-[900px] items-center justify-center">
                <label htmlFor="dropzone-file" className="">
                    <div className="text-center w-full justify-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14 mx-auto my-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                </label>
                <div className="text-center space-y-5">
                    <h1 className='text-3xl font-black'>Saved posts</h1>
                    <p className='text-[14px]'>Only you can see what you've saved</p>
                </div>
            </div>
        </div>
    )
}
