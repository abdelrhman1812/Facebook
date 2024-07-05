// src/app/context/PostContextProvider.js
"use client";

import { createContext, useState } from "react";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
