import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import CreatePost from '../components/CreatePost/CreatePost';
import SeeAllFollowersModal from '../components/SeeAllFollowersModal/SeeAllFollowersModal';
import LogoutModalComponent from '../components/logoutModalCompoment/logoutModalComponent';
import AboutUserAccountModal from '../components/AboutUserAccountModal/AboutUserAccountModal';
import SearchComponent from '../components/SearchComponent/SearchComponent';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <Sidebar />
            <CreatePost />
            <SeeAllFollowersModal />
            <LogoutModalComponent />
            <AboutUserAccountModal />
            <SearchComponent />
            <Outlet />
        </>
    );
}
