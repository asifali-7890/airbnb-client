import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext";


const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <div className=''>
            <header className='p-4 flex justify-between w-full'>
                <Link to="/" className='flex gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>

                    <span className='font-bold text-xl'>airBnb</span>
                </Link>

                <div className='hidden sm:flex  items-center gap-4 border border-gray-300 rounded-full p-3 bg-white shadow-lg hover:shadow-xl transition-all'>
                    <div className='text-gray-600 text-lg font-medium'>
                        <span>Anywhere</span>
                    </div>
                    <div className="border-l border-gray-300 h-6"></div>
                    <div className='text-gray-600 text-lg font-medium'>
                        <span>Any Week</span>
                    </div>
                    <div className="border-l border-gray-300 h-6"></div>
                    <div className='text-gray-600 text-lg font-medium'>
                        <span>Any Guests</span>
                    </div>


                    <Link to="/">
                        <div className='bg-red-500 rounded-full p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 p-1">
                                <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
                                <path fillRule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </Link>
                </div>


                <div className='flex gap-2 items-center border rounded-full p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                    <span className='bg-red-500 flex items-center rounded-full p-1'>
                        <Link to={user ? '/account' : "/login"} className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                            {!!user && (
                                <div className="flex">
                                    {user.name}
                                </div>
                            )}
                        </Link>
                    </span>

                </div>
            </header>


        </div>
    )
}

export default Header