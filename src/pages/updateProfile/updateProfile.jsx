import React, { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { storage, store } from '../../database/firebase';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function UpdateProfile() {
    const { userDatas } = useContext(UserAuthContext);
    const [loading, setLoading] = useState(false);
    const [userNewDatas, setUserNewDatas] = useState({
        userFullName: '',
        userName: '',
        userEmail: '',
        imgUrl: '',
        userBio: '',
    });
    const [file, setFile] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        if (!userDatas.uid) return;

        const userRef = query(collection(store, "users"), where("userId", "==", userDatas.uid));
        const unsubscribe = onSnapshot(userRef, (querySnap) => {
            let temp = {};
            querySnap.forEach((doc) => {
                temp = doc.data();
            });

            setData(temp);
            setUserNewDatas({
                userFullName: temp.fullName || '',
                userName: temp.userName || '',
                userEmail: temp.email || '',
                imgUrl: temp.imgUrl || '',
                userBio: temp.userBiography || ''
            });
        });

        return () => unsubscribe();
    }, [userDatas.uid]);

    const uploadHandler = async (file) => {
        if (!file) {
            return null;
        }

        const storageRef = ref(storage, 'updatedUsersAvatar/' + file.name);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserNewDatas((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const fileChangeHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let url = data.imgUrl;
            if (file) {
                url = await uploadHandler(file);
                setUserNewDatas((prevState) => ({
                    ...prevState,
                    imgUrl: url
                }));
            }

            const userRef = query(collection(store, "users"), where("userId", "==", userDatas.uid));
            const userSnap = await getDocs(userRef);
            const userDoc = userSnap.docs[0];

            const docRef = doc(store, "users", userDatas.uid);
            await setDoc(docRef, {
                email: userNewDatas.userEmail,
                userName: userNewDatas.userName,
                fullName: userNewDatas.userFullName,
                userBiography: userNewDatas.userBio,
                imgUrl: url,
            }, { merge: true });
            alert("Successfully");
        } catch (error) {
            console.error('Error updating profile: ', error);
            alert('Error updating profile. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className='w-full h-full justify-center items-center'>
            <div className="max-w-4xl h-full my-12 border border-solid mx-auto justify-center px-3 py-5">
                <form onSubmit={updateProfileHandler}>
                    <div className="flex items-center space-x-4 ml-24">
                        <label htmlFor='dropzone-file' className="cursor-pointer">
                            {file === null ? (
                                <img className='w-24 h-24 border rounded-full p-2' src={data.imgUrl} alt="" />
                            ) : (
                                <img className='w-24 h-24 border rounded-full p-2' src={URL.createObjectURL(file)} alt="" />
                            )}
                            <input type="file" id='dropzone-file' className='hidden' onChange={fileChangeHandler} />
                        </label>
                        <div>
                            <h1 className='text-lg font-semibold'>{data.userName}</h1>
                            <h2 className='text-[14px] font-normal text-gray-500'>{data.fullName}</h2>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="flex items-start space-x-4 ml-52">
                            <div>
                                <h1>Name</h1>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="userFullName"
                                    value={userNewDatas.userFullName}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    placeholder="Name"
                                    onChange={changeHandler}
                                />
                                <p className='text-[12px] w-72'>
                                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                    You can only change your name twice within 14 days.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 ml-44">
                            <div>
                                <h1>Username</h1>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="userName"
                                    value={userNewDatas.userName}
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    placeholder="Username"
                                    onChange={changeHandler}
                                />
                                <p className='text-[12px] w-64'>
                                    {`In most cases, you'll be able to change your username back to ${data.userName} for another 14 days. `}
                                    <Link className='text-blue-700' to='https://help.instagram.com/876876079327341'>Learn more</Link>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 ml-56">
                            <div>
                                <h1>Bio</h1>
                            </div>
                            <div className="space-y-4">
                                <textarea
                                    onChange={changeHandler}
                                    value={userNewDatas.userBio}
                                    name="userBio"
                                    className="block w-72 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="ml-64 my-4">
                            <h1 className='font-semibold'>Personal information</h1>
                            <p className='text-[10px] px-1 w-80'>
                                Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                            </p>
                        </div>
                        <div className="flex items-start space-x-4 ml-52">
                            <div>
                                <h1 className=''>Email</h1>
                            </div>
                            <div className="space-y-4">
                                <input
                                    onChange={changeHandler}
                                    value={userNewDatas.userEmail}
                                    type="email"
                                    name="userEmail"
                                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="ml-64 my-12">
                            <button type='submit' className='bg-blue-700 text-white py-1.5 px-8 rounded-md'>{loading ? "Sending..." : "Submit"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
