// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaceDetails = () => {

    const { id } = useParams(); // Access the id parameter from the URL
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
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(''); // New price state

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const placeData = {
            id,
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
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(placeData),
            });

            if (response.ok) {
                alert('Place saved successfully!');
                // Redirect to /account/places
                location.href = '/account/places'; // Redirect after successful submission
            } else {
                alert('Failed to save the place.');
            }
        } catch (error) {
            console.error('Error saving the place:', error);
            alert('An error occurred while saving the place.');
        }
    };

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

    useEffect(() => {
        // Fetch the place details using the id from the URL
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/places/${id}`)
            .then(response => {
                const place = response.data;
                // Set the data to corresponding state variables
                setTitle(place.title);
                setAddress(place.address);
                setPhotos(place.photos);
                setDescription(place.description);
                setPerks(place.perks);
                setExtraInfo(place.extraInfo);
                setCheckIn(place.checkIn);
                setCheckOut(place.checkOut);
                setMaxGuests(place.maxGuests);
                setPrice(place.price);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching place details:', error);
                setLoading(false);
            });
    }, [id]); // Re-fetch if the id changes

    const handleDeletePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    // Function to handle making an image the first image
    const handleSetPrimaryImage = (index) => {
        if (index !== 0) {
            const newPhotos = [...photos];
            const [selectedPhoto] = newPhotos.splice(index, 1); // Remove the selected photo
            newPhotos.unshift(selectedPhoto); // Add it to the beginning
            setPhotos(newPhotos); // Update state
        }
    };


    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <div className="mb-2">
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
                <div className="mt-4 grid grid-cols-3 gap-2 relative">
                    {photos.length > 0 &&
                        photos.map((fileName, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL}uploads/${fileName}`}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                {/* Star Icon */}
                                <button
                                    type="button"
                                    onClick={() => handleSetPrimaryImage(index)}
                                    className="absolute top-2 left-2 p-1 bg-gray-700 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    {index === 0 ? (
                                        // Solid Star for the first image
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        // No-Solid Star for other images
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                            />
                                        </svg>
                                    )}
                                </button>
                                {/* Delete Icon */}
                                <button
                                    type="button"
                                    onClick={() => handleDeletePhoto(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
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

                <h2 className="text-2xl mt-4 ">Check-in & Out Times</h2>
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
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg w-full"
                >
                    Save
                </button>
            </form> </div>
    )
}

export default PlaceDetails 