import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

export default function UserCardComponent({ userUid, userName, userFullName, userImgUrl }) {

    const { id } = useSearchParams();

    return (
        <div className='absolute right-20 top-2 mx-auto'>
            <div className="w-full max-w-sm">
                <div className="flex items-center space-x-8 p-1 py-2 px-5">
                    <Link to={`/${userUid}`}>
                        <img className="w-12 h-12 border rounded-full" src={userImgUrl} alt="" />
                    </Link>
                    <div className="space-y-1">
                        <Link to={`/${userUid}`}>
                            <h5 className="text-base font-medium">{userName}</h5>
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{userFullName}</span>
                    </div>
                    <div className="">
                        <Button className='text-blue-700 border-none focus:ring-0'>
                            Switch
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
