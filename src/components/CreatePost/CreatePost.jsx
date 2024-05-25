import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { storage, store } from '../../database/firebase';
import { CreatePostModalContext } from '../../Provider/ActionsContext/ActionsContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { X } from 'lucide-react';
import { Button } from 'flowbite-react';
import { addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [postDescription, setPostDescription] = useState('');
    const { openCreatePostModal, setOpenCreatePostModal } = useContext(CreatePostModalContext);
    const { userDatas } = useContext(UserAuthContext);
    const [user, setUser] = useState({});


    const cancelButtonRef = useRef(null);

    const CloseHandler = () => {
        setFile(null);
        setPostDescription('');
        setOpenCreatePostModal(false);

    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFiles = async (file) => {
        if (!file) {
            return null;
        }

        const storageRef = ref(storage, 'posts/' + file.name);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    };

    useEffect(() => {
        const fetchUseData = async () => {
            const userRef = doc(store, "users", userDatas.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setUser(userSnap.data());
            }
        }

        fetchUseData();
    }, [userDatas.uid])

    const CreatePostHandler = async () => {
        if (file !== null || postDescription !== '') {
            setLoading(true);

            try {
                const url = await uploadFiles(file);
                const userRef = query(collection(store, "users"), where("userId", "==", userDatas.uid));
                const userSnapShot = await getDocs(userRef);
                const userDoc = userSnapShot.docs[0];

                const postsRef = collection(store, "posts");

                await addDoc(postsRef, {
                    userId: user.userId,
                    postsURL: url,
                    postsDescription: postDescription,
                    userName: user.userName,
                    userImg: user.imgUrl,
                });

                await updateDoc(doc(store, "users", userDoc.id), {
                    postsTotal: increment(1)
                });
                setFile(null);
                setPostDescription('');
                setOpenCreatePostModal(false);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        }
    };

    return (
        <Transition.Root show={openCreatePostModal} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenCreatePostModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white py-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <h1 className='text-xl border-b pb-4 font-medium'>Create new post</h1>
                                    </div>
                                </div>
                                <div className="w-[400px] mx-auto flex items-center justify-center">
                                    {file === null ? (
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    ) : (
                                        <div className="w-full justify-center items-center relative">
                                            <button onClick={() => setFile(null)} className="absolute top-2 right-2">
                                                <X className="text-gray-500 hover:text-gray-700" />
                                            </button>
                                            <img src={URL.createObjectURL(file)} className='items-center justify-center w-full rounded-lg bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100' alt="Selected file" />
                                        </div>
                                    )}
                                </div>
                                <div className="w-[450px] mx-auto col-span-2 mb-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Description</label>
                                    <textarea
                                        value={postDescription}
                                        onChange={(e) => setPostDescription(e.target.value)}
                                        id="description" rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Add description to your post">
                                    </textarea>
                                </div>
                                <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                                        onClick={CreatePostHandler}
                                    >
                                        {loading ? 'Creating ...' : 'Create'}
                                    </Button>
                                    <Button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={CloseHandler}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
