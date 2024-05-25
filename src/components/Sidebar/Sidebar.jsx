import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Home, LogOut, PlusCircle, Search } from 'lucide-react'
import { ActionsContext, CreatePostModalContext } from '../../Provider/ActionsContext/ActionsContext';

function Sidebar() {

    const { setOpenModal } = useContext(ActionsContext);
    const { setOpenCreatePostModal, setOpenSearchComponent } = useContext(CreatePostModalContext);

    return (
        <div>
            <aside className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-4 py-4 overflow-y-auto text-gray-900 border border-gray-200">
                    <ul className="space-y-5 font-medium">
                        <li>
                            <Link className="items-center z-10" to='/'>
                                <img className='mx-auto w-36' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0kiQopQPHtpBkDU0kkSQ6YzAXiRCy_i0S0PzMAcG&s" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className="flex items-center p-2 mt-14 px-8 rounded-lg hover:bg-gray-200">
                                <Home className='w-5 h-5' />
                                <span className="flex-1 ms-3 text-[18px] whitespace-nowrap">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center p-2 px-8 text-gray-900 rounded-lg hover:bg-gray-200" onClick={() => setOpenSearchComponent(true)}>
                                <Search className='w-5 h-5' />
                                <span className="flex-1 text-[18px] ms-3 whitespace-nowrap">Search</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={() => setOpenCreatePostModal(true)}
                                className="flex items-center p-2 px-8 text-gray-900 rounded-lg hover:bg-gray-200">
                                <PlusCircle className='w-5 h-5' />
                                <span className="flex-1 ms-3 text-[18px] whitespace-nowrap">Create</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center p-2 bo px-8 text-gray-900 rounded-lg hover:bg-gray-200" onClick={() => setOpenModal(true)}>
                                <LogOut className='w-5 h-5' />
                                <span className="flex-1 ms-3 text-[18px] whitespace-nowrap">Log out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar