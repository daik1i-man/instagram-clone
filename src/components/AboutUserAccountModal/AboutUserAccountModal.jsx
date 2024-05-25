import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import UserImg from '/user.svg';
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext'
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { store } from '../../database/firebase';

export default function AboutUserAccountModal() {
    const { openAboutUserAccountModal, setOpenAboutUserAccountModal } = useContext(ActionsContext);
    const { userDatas } = useContext(UserAuthContext);
    const [data, setData] = useState({});
    const cancelButtonRef = useRef(null);

    if (!userDatas?.email) return;

    useEffect(() => {
        const queryUser = query(collection(store, "users"), where("userId", "==", userDatas.uid));
        const unsubscribe = onSnapshot(queryUser, (querySnap) => {
            let temp = {};
            querySnap.forEach((doc) => {
                temp = doc.data();
            })

            setData(temp);
        })
        return () => unsubscribe;
    }, [])

    return (
        <Transition.Root show={openAboutUserAccountModal} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenAboutUserAccountModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden justify-center rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 p6-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="space-y-4">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="font-semibold">
                                                About your account
                                            </Dialog.Title>
                                        </div>
                                        <div className="w-full justify-center">
                                            <img className='w-20 h-20 rounded-full mx-auto' src={data.imgUrl} alt="" />
                                            <h3 className='w-full text-center font-semibold'>{data.userName}</h3>
                                        </div>
                                    </div>
                                    <div className="text-xs text-center w-80 my-3 mx-auto">
                                        To help keep our community authentic, we’re showing information about accounts on Instagram. People can see this by tapping on the ••• on your profile and choosing About This Account. <a className='text-blue-700' href="https://help.instagram.com/697961817256175">See why this information is important</a>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm my-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>

                                        <div className="">
                                            <p>Date Joined</p>
                                            <p>{data.joinDate}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="mt-3 w-full justify-center bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 border border-solid mx-auto"
                                    onClick={() => setOpenAboutUserAccountModal(false)}
                                    ref={cancelButtonRef}
                                >
                                    Close
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
