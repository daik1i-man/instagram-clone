import React from 'react'
import Header from '../../components/Header/Header';
import SuggestersListComponent from '../../components/SuggestersListComponent/SuggestersListComponent'
import PostsFeedComponent from '../../components/PostsFeedComponent/PostsFeedComponent';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Home() {
    return (
        <div className='relative w-full h-screen justify-center items-center'>
            <div className="max-w-3xl mx-auto justify-between w-full">
                <Header />
                <Sidebar />
                <SuggestersListComponent />
                <PostsFeedComponent />
            </div>
        </div>
    )
}
