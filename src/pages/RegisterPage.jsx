
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

const RegisterPage = () => {
    // State variables for email and password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Make a POST request to the /register endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}register`, {
                name,
                email,
                password,
            });

            // Log the response data to the console
            // location.href = '/login';
            navigate('/login');
            alert('Registration successful. Now you can log in');
            // console.log('Response data:', response.data);
        } catch (error) {
            alert('Registration unsuccessful. Email already exists.');
            console.error('Error during registration:', error);
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
                        onChange={(e) => setName(e.target.value)} // Update email state
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
                    <button type="submit" className="primary">Login</button>
                    <div className="text-center text-gray-500 py-2">
                        Already a member? <Link to={'/login'} className="underline text-black">Login now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage