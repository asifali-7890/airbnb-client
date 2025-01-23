import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import BookingsPage from "./BookingsPage.jsx";
import SinglePage from "./SinglePage.jsx";

export default function AccountPage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    axios.defaults.withCredentials = true;
    let { subpage, action } = useParams(); // Get the current subpage from the URL

    if (!subpage) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }


    // If not ready, show loading state; if ready but no user, redirect to login
    if (!ready) return <div>Loading...</div>;
    if (!user && !redirect) return <Navigate to="/login" />;

    // Function to determine link classes based on the current subpage
    const linkClasses = (page) => {
        let classes = "gap-1 inline-flex py-2 px-6"; // Default classes
        if (page === subpage) {
            classes += " bg-red-500 text-white rounded-full"; // Active link classes
        }
        return classes;
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    // Render the account page content if the user is logged in
    return (
        <div>
            <nav className="w-full flex flex-col sm:flex-row justify-center mt-8 gap-2 mb-8">
                <Link to="/account" className={linkClasses("profile")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    My Profile
                </Link>
                <Link to="/account/bookings" className={linkClasses("bookings")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                    My Bookings
                </Link>
                <Link to="/account/places" className={linkClasses("places")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                        />
                    </svg>
                    My Accommodations
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as <strong>{user.name}</strong> ({user.email}). <br />
                    <button onClick={logout} className="w-full bg-red-500 text-white rounded-full mt-2 py-2 px-4">
                        Logout
                    </button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}

            {subpage === 'bookings' && !action && (
                <BookingsPage />
            )}
            {subpage === 'bookings' && action && (
                <SinglePage />
            )}
        </div>
    );
}