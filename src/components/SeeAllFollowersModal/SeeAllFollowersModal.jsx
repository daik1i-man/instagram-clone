import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext';
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { store } from '../../database/firebase';
import FollowersCardComponent from '../FollowersCardComponent/FollowersCardComponent';

export default function SeeAllFollowersModal() {
    const { userDatas } = useContext(UserAuthContext);
    const [suggestersData, setSuggestersData] = useState([]);
    const { openFollowersModal, setOpenFollowersModal } = useContext(ActionsContext);

    if (!userDatas?.email) return;

    useEffect(() => {
        const queryUsers = query(collection(store, "users"), where("userId", "!=", userDatas.uid));
        const unsubscribe = onSnapshot(queryUsers, (querySnap) => {
            const temp = [];
            querySnap.forEach((doc) => {
                temp.push(doc.data());
            })
            setSuggestersData(temp);
        })

        return () => unsubscribe;
    }, [])


    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={openFollowersModal} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenFollowersModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="space-y-4 h-96 overflow-y-scroll overflow-x-hidden p-5 pb-8 scroll-m-12">
                                    <h1 className='ml-16 font-semibold m-2 my-4'>Suggested</h1>
                                    <div className="space-y-4 transform translate-x-16">
                                        {suggestersData.map((user, i) => (
                                            <FollowersCardComponent
                                                key={i}
                                                userName={user.userName}
                                                userFullName={user.fullName}
                                                userImgUrl={user.imgUrl}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
