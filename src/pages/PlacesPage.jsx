import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PlacesPage = () => {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [places, setPlaces] = useState([]);
    const [price, setPrice] = useState(''); // New price state
    const [loading, setLoading] = useState(false);
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    // Add photo via link
    const addPhotoByLink = async (e) => {
        e.preventDefault();

        try {
            const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });

            // console.log(fileName);

            if (fileName) {
                setPhotos([...photos, fileName]);
                setPhotoLink('');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            // Optionally, show an error message to the user
        }
    };

    // Handle photo upload
    const uploadPhoto = async (event) => {
        const files = event.target.files;
        const formData = new FormData();

        // Append all selected files to FormData
        Array.from(files).forEach((file) => {
            formData.append('photos', file); // 'photos' is the name of the field
        });

        try {
            // Send the files to the server
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}upload-photos`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            // Add the uploaded file names to the photos state
            setPhotos([...photos, ...data.uploadedPhotos]);
            setPhotoLink(''); // Clear the link or reset it

        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setLoading(true); // Start spinner
        const placeData = {
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price, // Include the price in the submission data
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}places`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(placeData),
            });

            if (response.ok) {
                // alert('Place saved successfully!');
                // Redirect to /account/places
                // location.href = '/account/places'; // Redirect after successful submission
                navigate('/account/places');
            } else {
                alert('Failed to save the place.');
            }
        } catch (error) {
            console.error('Error saving the place:', error);
            alert('An error occurred while saving the place.');
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    useEffect(() => {
        axios.get('/user-places')
            .then(({ data }) => {
                // console.log('Successfully', data);
                setPlaces(data);
            });
    }, []);


    return (
        <div>
            {action !== 'new' ? (
                <div className="text-center">
                    <Link
                        className="inline-flex items-center gap-1 bg-red-600 text-white py-2 px-6 rounded-full"
                        to="/account/places/new"
                    >
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Add new place
                    </Link>
                    <div className="mt-4">
                        {places.length > 0 ? (
                            places.map((place) => (
                                <Link
                                    key={place._id}
                                    to={`/places/${place._id}`}
                                    className="flex flex-col md:flex-row cursor-pointer items-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md m-4 p-4 transition-all"
                                >
                                    {/* Image Section */}
                                    <div className="w-full md:w-32 h-32 bg-gray-300 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
                                        {place.photos?.length > 0 ? (
                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}uploads/${place.photos[0]}`}
                                                alt={place.title || "Place image"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center text-gray-500 text-center w-full h-full">
                                                No Image Available
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Section */}
                                    <div className="flex flex-col text-left w-full">
                                        <h2 className="text-lg font-semibold text-gray-800 truncate">{place.title}</h2>
                                        <strong className="text-md text-gray-600 mt-2 truncate">{place.address}</strong>
                                        <h3 className="font-bold text-gray-600 mt-2 truncate">{place.description}</h3>
                                        <p className="text-sm text-gray-600 mt-2 truncate">{place.extraInfo}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No places found.</p>
                        )}
                    </div>




                </div>
            ) : (
                <form className="p-4 max-w-3xl mx-auto " onSubmit={handleSubmit}>
                    <h2 className="text-2xl mt-4">Title</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title, e.g., My lovely place"
                        className="w-full border rounded-lg py-2 px-4 mt-1"
                    />

                    <h2 className="text-2xl mt-4">Address</h2>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="w-full border rounded-lg py-2 px-4 mt-1"
                    />

                    <h2 className="text-2xl mt-4">Photos</h2>
                    <p className="text-gray-500 text-sm">Add photos via a link or upload them</p>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={photoLink}
                            onChange={(e) => setPhotoLink(e.target.value)}
                            placeholder="Add photo link... e.g., http://example.com/image.jpg"
                            className="w-full border rounded-lg py-2 px-4"
                        />
                        <button
                            type="button"
                            onClick={addPhotoByLink}
                            className="bg-gray-200 px-4 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={uploadPhoto}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center border w-full rounded-lg py-2 text-gray-600 bg-gray-100">
                                Upload photos
                            </div>
                        </label>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {photos.length > 0 && photos.map((fileName, index) => (
                            <>
                                <img
                                    key={index}
                                    src={`${import.meta.env.VITE_API_BASE_URL}uploads/${fileName}`} // Concatenating the base URL and file name
                                    alt={`Uploaded ${index + 1}`} // Improved alt text for accessibility
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            </>
                        ))}
                    </div>

                    <h2 className="text-2xl mt-4">Description</h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description of your place"
                        className="w-full border rounded-lg py-2 px-4 mt-1"
                    ></textarea>

                    <h2 className="text-2xl mt-4">Perks</h2>
                    <p className="text-gray-500 text-sm">Select all the perks you want to include</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {['Wifi', 'Radio', 'Free parking', 'TV', 'Pets', 'Private'].map((perk) => (
                            <label key={perk} className="flex items-center gap-2 border p-2 rounded-lg">
                                <input
                                    type="checkbox"
                                    value={perk}
                                    checked={perks.includes(perk)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setPerks((prev) =>
                                            checked ? [...prev, perk] : prev.filter((p) => p !== perk)
                                        );
                                    }}
                                    className="w-5 h-5"
                                />
                                <span>{perk}</span>
                            </label>
                        ))}
                    </div>

                    <h2 className="text-2xl mt-4">Extra Info</h2>
                    <textarea
                        value={extraInfo}
                        onChange={(e) => setExtraInfo(e.target.value)}
                        placeholder="Add extra information, e.g., house rules"
                        className="w-full border rounded-lg py-2 px-4 mt-1"
                    ></textarea>

                    <h2 className="text-2xl mt-4">Check-in & Out Times</h2>
                    <div className="grid grid-cols-4 gap-2">
                        <div>
                            <label>Check-in Time</label>
                            <input
                                type="text"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                placeholder="14:00"
                                className="w-full border rounded-lg py-2 px-4 mt-1"
                            />
                        </div>
                        <div>
                            <label>Check-out Time</label>
                            <input
                                type="text"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                placeholder="11:00"
                                className="w-full border rounded-lg py-2 px-4 mt-1"
                            />
                        </div>
                        <div>
                            <label>Max Guests</label>
                            <input
                                type="number"
                                value={maxGuests}
                                onChange={(e) => setMaxGuests(Number(e.target.value))}
                                placeholder="1"
                                className="w-full border rounded-lg py-2 px-4 mt-1"
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="1"
                                className="w-full border rounded-lg py-2 px-4 mt-1"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 flex justify-center items-center bg-blue-500 text-white py-2 px-6 rounded-lg w-full"
                    >
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
                            'Save'
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PlacesPage;
