import React, { useContext, useEffect, useState } from 'react'
import PostsComponent from '../PostsComponent/PostsComponent'
import { store } from '../../database/firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';

export default function PostsFeedComponent() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const FetchPosts = async () => {
            const postRef = collection(store, "posts");
            const postSnap = onSnapshot(postRef, (postQuerySnap) => {
                const PostsTemp = [];
                postQuerySnap.forEach((doc) => {
                    PostsTemp.push(doc.data());
                })
                setPosts(PostsTemp);
            })
        }

        FetchPosts();
    }, [])

    return (
        <div className='max-w-[650px] space-y-10 pb-20 justify-center items-center'>
            {posts.map((post, i) => (
                <PostsComponent
                    key={i}
                    userImg={post.userImg}
                    userName={post.userName}
                    userPostURL={post.postsURL}
                    userid={post.userId}
                    userPostsDescription={post.postsDescription}
                />
            ))}
        </div>
    )
}
