import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // console.log('import.meta.env.VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL);
    // axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('/profile', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setReady(true);
            })
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready, setReady }}>
            {children}
        </UserContext.Provider>
    )
}