import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    // State variables for email, password, and loading
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Start loading spinner

        try {
            // Make a POST request to the /register endpoint
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}register`, {
                name,
                email,
                password,
            });

            navigate('/login'); // Redirect to login page
            // alert('Registration successful. Now you can log in');
        } catch (error) {
            alert('Registration unsuccessful. Email already exists.');
            console.error('Error during registration:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-20">
                <h1 className="text-center text-4xl mb-4">Register</h1>
                <form onSubmit={handleSubmit} action="" className="mx-auto max-w-md">
                    <input
                        type="text"
                        placeholder="write your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state
                        required
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        required
                    />
                    <button
                        type="submit"
                        className="primary flex justify-center items-center"
                        disabled={loading} // Disable button while loading
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
                            'Register'
                        )}
                    </button>
                    <div className="text-center text-gray-500 py-2">
                        Already a member?{' '}
                        <Link to={'/login'} className="underline text-black">Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
