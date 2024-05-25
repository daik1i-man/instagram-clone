import { Link, useNavigate } from 'react-router-dom';
import InstagramTextLogo from '/instagram-text-icon.svg';
import { useEffect, useState } from 'react';
import { auth, storage, store } from '../../database/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { getDownloadURL, ref } from 'firebase/storage';
import IsLoader from '../../isLoader/isLoader';

export default function Register() {
    const [userEmail, setUserEmail] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [firebaseErrors, setFirebaseErrors] = useState('');
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (userEmail !== '' && userFullName !== '' && userName !== '' && userPassword !== '') {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }, [userEmail,
        userFullName,
        userName,
        userPassword]
    )

    const date = new Date();
    const formatted = format(date, 'MMMM yyyy');

    const SubmitDatas = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            await createUserWithEmailAndPassword(auth, userEmail, userPassword);

            const imageRef = ref(storage, 'userDefaultAvatar/user.png');
            getDownloadURL(imageRef)
                .then((url) => {
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            const userRef = doc(store, "users", user.uid);

                            await setDoc(userRef, {
                                email: userEmail,
                                fullName: userFullName,
                                userName: userName,
                                imgUrl: url,
                                userBiography: '',
                                followersTotal: 0,
                                followingTotal: 0,
                                postsTotal: 0,
                                joinDate: formatted,
                                userId: user.uid,
                            });
                        }

                        setUserEmail('');
                        setUserFullName('');
                        setUserName('');
                        setUserPassword('');

                        if (loading) {
                            return <IsLoader />
                        }
                        navigate('/');
                    });
                })

            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="max-w-5xl space-x-4 items-center h-screen mx-auto flex justify-between">
                <div className="">
                    <img className='rounded-md' src="https://i.pinimg.com/564x/f0/0d/ef/f00def0b359dd8c1b6732b4598c7577c.jpg" alt="img" />
                </div>
                <div className="">
                    <div className="">
                        <div className="max-w-[400px] w-[400px] mx-auto border justify-center px-6 py-10  lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src={InstagramTextLogo}
                                    alt="Your Company"
                                />
                                <p className='text-center max-w-56 mx-auto font-medium'>Sign up to see photos and videos from your friends.</p>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={SubmitDatas} action="#" method="POST">
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)}
                                                id="text"
                                                name="text"
                                                type="text"
                                                autoComplete="text"
                                                placeholder='Mobile Number or email'
                                                required
                                                className="block w-full px-3 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                value={userFullName}
                                                onChange={(e) => setUserFullName(e.target.value)}
                                                id="text"
                                                name="text"
                                                type="text"
                                                autoComplete="text"
                                                placeholder='Full Name'
                                                required
                                                className="block w-full px-3 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                id="text"
                                                name="text"
                                                type="text"
                                                autoComplete="text"
                                                placeholder='Username'
                                                required
                                                className="block w-full px-3 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2 relative">
                                            <input
                                                value={userPassword}
                                                onChange={(e) => setUserPassword(e.target.value)}
                                                id="password"
                                                name="password"
                                                type={`${show ? 'text' : 'password'}`}
                                                autoComplete="current-password"
                                                placeholder='password'
                                                required
                                                className="block w-full px-3 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                            <p className='text-xs text-indigo-600 absolute right-3 top-2.5 cursor-pointer' onClick={() => setShow((prev) => !prev)}>{`${show ? 'Hide' : 'Show'}`}</p>
                                        </div>
                                    </div>
                                    <p className='text-xs w-64 opacity-50 text-center mx-auto my-2'>
                                        People who use our service may have uploaded your contact information to Instagram.
                                        <Link to='https://www.facebook.com/help/instagram/261704639352628' className="font-medium text-xs text-center m-1 text-indigo-600 hover:text-indigo-500">
                                            Learn More
                                        </Link>
                                    </p>
                                    <div>
                                        {active ? (loading ? (<button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                        </button>) : (<button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign up
                                        </button>)) : (<button
                                            disabled
                                            type="submit"
                                            className="flex w-full justify-center disabled:opacity-50 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign up
                                        </button>)}
                                    </div>
                                    <p className='text-base text-red-700 mt-4'>{firebaseErrors}</p>
                                </form>
                            </div>
                        </div>
                        <p className="mt-3 py-5 border border-solid max-w-[400px] mx-auto items-center text-center text-sm text-gray-500">
                            Don't have an account? {' '}
                            <Link to='/' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div >
            </div >
        </>
    )
}
