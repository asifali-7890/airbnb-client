import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

const LoginPage = () => {
    // State variables for email, password, and loading
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    axios.defaults.withCredentials = true;

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Start spinner

        try {
            // Make a POST request to the /login endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}login`, {
                email,
                password,
            });

            setUser(response.data); // Save user data in context
            setRedirect(true); // Redirect to home page
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    // Redirect to the home page after successful login
    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-20">
                <h1 className="text-center text-4xl mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        required
                        className="border p-2 mb-4 w-full"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        required
                        className="border p-2 mb-4 w-full"
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
                            'Login'
                        )}
                    </button>
                    <div className="text-center text-gray-500 py-2">
                        Don't have an account?{' '}
                        <Link to={'/register'} className="underline text-black">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
