"use client";

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tokenString = localStorage.getItem('tokenArtical');
        if (tokenString) {
            try {
                const decodedToken = jwtDecode(tokenString);
                setToken(tokenString);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('Token not found in localStorage');
        }
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContextProvider;
