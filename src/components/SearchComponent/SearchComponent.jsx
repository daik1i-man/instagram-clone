import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Field, Input } from '@headlessui/react'
import { UserAuthContext } from '../../Provider/userAuthProvider/userAuthProvider'
import { CreatePostModalContext } from '../../Provider/ActionsContext/ActionsContext'
import clsx from 'clsx'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { store } from '../../database/firebase'
import FollowersCardComponent from '../FollowersCardComponent/FollowersCardComponent'

export default function SearchComponent() {
    const { openSearchComponent, setOpenSearchComponent } = useContext(CreatePostModalContext);
    const { userDatas } = useContext(UserAuthContext);
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const cancelButtonRef = useRef(null);

    if (!userDatas?.email) return;

    useEffect(() => {
        const queryUsers = query(collection(store, "users"), where("userId", "!=", userDatas.uid));
        const unsubscribe = onSnapshot(queryUsers, (querySnap) => {
            const temp = [];
            querySnap.forEach((doc) => {
                temp.push(doc.data());
                setFiltered(temp);
                setData(temp);
            })

        })

        return () => unsubscribe;
    }, [])

    const FilteringDatas = (event) => {
        event.preventDefault();
        setFiltered(data.filter(f => f.userName.includes(event.target.value)));
    }

    return (
        <Transition.Root show={openSearchComponent} as={Fragment}>
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenSearchComponent}>
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

                <div className="fixed inset-0 z-10 w-screen">
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
                            <Dialog.Panel className="relative transform h-[450px] scroll-m-0 rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white rounded-md pt-5 sm:p-8 space-y-8 justify-center">
                                    <div className="">
                                        <h1 className='font-semibold text-2xl'>Search</h1>
                                    </div>
                                    <div className="w-full max-w-md">
                                        <Field className=''>
                                            <Input
                                                onChange={(event) => FilteringDatas(event)}
                                                placeholder='Search...'
                                                type='search'
                                                className={clsx(
                                                    'mt-3 block w-full rounded-lg border border-gray-300 bg-white/5 py-1.5 px-3 text-sm/6 text-gray-800',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                            />
                                        </Field>
                                    </div>
                                </div>
                                <div className="justify-center mx-auto w-[390px] overflow-y-scroll h-60 scroll-m-80 space-y-4" onClick={cancelButtonRef}>
                                    {filtered.map((user, i) => (
                                        <FollowersCardComponent
                                            key={i}
                                            userEmail={user.email}
                                            userName={user.userName}
                                            userFullName={user.fullName}
                                            userImgUrl={user.imgUrl}
                                        />
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
