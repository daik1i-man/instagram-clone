import React, { Suspense, lazy, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import IsLoader from '../isLoader/isLoader';
import { UserAuthContext } from '../Provider/userAuthProvider/userAuthProvider';
import Layout from '../Layout/Layout';

const Home = lazy(() => import("../pages/Home/Home"));
const Register = lazy(() => import("../pages/register/register"));
const Login = lazy(() => import("../pages/login/login"));
const ErrorPage = lazy(() => import("../pages/errorPage/errorPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfile/UserProfilePage"));
const PostsLayoutTab = lazy(() => import("../LayoutTabs/PostLayoutTab/PostsLayoutTab"));
const ReelsLayoutTab = lazy(() => import("../LayoutTabs/ReelsLayoutTab/ReelsLayoutTab"));
const SavedPostsLayoutTab = lazy(() => import("../LayoutTabs/SavedPostsLayoutTab/SavedPostsLayoutTab"));
const TaggedLayoutTab = lazy(() => import("../LayoutTabs/TaggedLayoutTab/TaggedLayoutTab"));
const UpdateProfile = lazy(() => import("../pages/updateProfile/updateProfile"));

export default function PagesRouting() {
    const { userStatus, loading } = useContext(UserAuthContext);

    if (loading) {
        return <IsLoader />;
    }

    return (
        <Suspense fallback={<IsLoader />}>
            <Routes>
                {userStatus ? (
                    <Route element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/:id' element={<UserProfilePage />}>
                            <Route index element={<PostsLayoutTab />} />
                            <Route path='reels' element={<ReelsLayoutTab />} />
                            <Route path='saved' element={<SavedPostsLayoutTab />} />
                            <Route path='tagged' element={<TaggedLayoutTab />} />
                        </Route>
                        <Route path='/edit' element={<UpdateProfile />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Route>
                ) : (
                    <>
                        <Route path='/' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<ErrorPage />} />
                    </>
                )}
            </Routes>
        </Suspense>
    );
}
