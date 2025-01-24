import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        setLoading(true); // Start spinner
        try {
            const response = await axios.post("/bookings", {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                place: place._id,
                price: numberOfNights * place.price,
            });
            const bookingId = response.data._id;
            navigate(`/account/bookings/${bookingId}`); // Redirect to booking page
        } catch (error) {
            console.error("Error booking this place:", error);
        } finally {
            setLoading(false); // Stop spinner
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        bookThisPlace(); // Trigger the booking function
    };

    return (
        <form className="bg-white shadow p-4 rounded-2xl" onSubmit={handleSubmit}>
            <div className="text-2xl text-center">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col sm:flex-row">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            required
                            onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            required
                            onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        required
                        onChange={(ev) => setNumberOfGuests(ev.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(ev) => setName(ev.target.value)}
                        />
                        <label>Phone number:</label>
                        <input
                            type="tel"
                            value={phone}
                            required
                            onChange={(ev) => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="primary mt-4 flex justify-center items-center" disabled={loading}>
                {loading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                ) : (
                    <>
                        Book this place
                        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
                    </>
                )}
            </button>
        </form>
    );
}
