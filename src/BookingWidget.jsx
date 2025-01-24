import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

// eslint-disable-next-line react/prop-types
export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
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
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        // location.href = `/account/bookings/${bookingId}`;
        navigate(`/account/bookings/${bookingId}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here (e.g., making API call)
        bookThisPlace();
    };


    return (
        <form className="bg-white shadow p-4 rounded-2xl" onSubmit={handleSubmit}>
            <div className="text-2xl text-center">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            required
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            required
                            onChange={ev => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        required
                        onChange={ev => setNumberOfGuests(ev.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label>Phone number:</label>
                        <input
                            type="tel"
                            value={phone}
                            required
                            onChange={ev => setPhone(ev.target.value)}
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="primary mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </form>

    );
}