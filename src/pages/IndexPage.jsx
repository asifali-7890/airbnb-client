import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 ? (
                places.map((place, index) => (
                    <Link key={index} to={'/shownplace/' + place._id}>
                        <div key={place._id} className="bg-gray-100 rounded-2xl overflow-hidden">
                            <div className="relative">
                                {place.photos?.[0] ? (
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={`${import.meta.env.VITE_API_BASE_URL}uploads/${place.photos[0]}`}
                                        alt={place.title}
                                    />
                                ) : (
                                    <>
                                        <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                                            No Image Available
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="font-bold text-lg">{place.address}</h2>
                                <h3 className="text-sm text-gray-500">{place.title}</h3>
                                <div className="mt-1">
                                    <span className="font-bold">${place.price}</span> per night
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <>
                    <p className="text-gray-500 text-center col-span-full mb-4">
                        No places available... <Link to='/login'><strong className="text-2xl text-pink-500">Login</strong></Link> to see.
                    </p>
                    {/* <div className="w-full h-screen relative grow">
                        <img
                            className="w-full h-1/2  object-cover"
                            src="https://wallpapercave.com/wp/wp2291551.jpg"
                            alt="Default place image"
                        />
                    </div> */}
                </>
            )}
        </div>

    );
}