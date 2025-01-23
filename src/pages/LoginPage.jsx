import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext.jsx";

const LoginPage = () => {
    // State variables for email and password
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    axios.defaults.withCredentials = true;

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Make a POST request to the /login endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}login`, {
                email,
                password,
            });

            // Log the response data to the console
            alert('Successfully logged in....');
            setUser(response.data);
            setRedirect(true);
            // console.log('Login response:', response.data);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    if (redirect) {
        return <Navigate to={'/'} />
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
                    <button type="submit" className="primary">Login</button>
                    <div className="text-center text-gray-500 py-2">
                        Dont have an account? <Link to={'/register'} className="underline text-black">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;