import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { differenceInCalendarDays, format } from "date-fns";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("/bookings").then((response) => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <div>
                {bookings?.length > 0 ? (
                    bookings.map((booking, index) => (
                        <Link
                            key={index}
                            to={`/account/bookings/${booking._id}`}
                            className="flex flex-col md:flex-row gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {/* Image Section */}
                            <div className="w-full h-48 md:w-48 md:h-auto flex-shrink-0">
                                {booking.place.photos?.length > 0 ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_BASE_URL}uploads/${booking.place.photos[0]}`}
                                        alt={booking.place.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="bg-gray-300 flex items-center justify-center h-full">
                                        <span className="text-gray-500">No Image Available</span>
                                    </div>
                                )}
                            </div>

                            {/* Booking Info Section */}
                            <div className="p-4 flex flex-col justify-between w-full">
                                <h2 className="text-xl font-semibold text-gray-800 truncate">
                                    {booking.place.title}
                                </h2>
                                <div className="text-gray-600 text-sm mt-2">
                                    {differenceInCalendarDays(
                                        new Date(booking.checkOut),
                                        new Date(booking.checkIn)
                                    )}{" "}
                                    nights:
                                    <span className="ml-2">
                                        {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;{" "}
                                        {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-800 mt-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                        />
                                    </svg>
                                    <span className="text-lg font-semibold">
                                        Total price: ${booking.price}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">You have no bookings yet.</p>
                )}
            </div>
        </div>
    );
}
