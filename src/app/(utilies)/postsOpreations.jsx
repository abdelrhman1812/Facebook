import axios from 'axios';

// const url = 'http://localhost:8000'
const url = 'https://facebook-node-9sqd.onrender.com';

const getHeaders = () => {
    const token = localStorage.getItem('tokenArtical');
    if (!token) {
        console.error("Token not found in localStorage.");
        return {};
    }
    return {
        token: token
    };
};

/* ==================  Get All Posts ================== */
export const getPosts = async () => {
    try {
        const headers = getHeaders();
        const { data } = await axios.get(`${url}/posts`, { headers });
        return data.posts.filter(post => post.deletedAt === null);
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

/* ==================  Add Post ================== */
export const addPost = async (formData) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.post(`${url}/posts`, formData, { headers });
        console.log('data:', data);
        return data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

/* ==================  Delete Post  ================== */
export const deletePost = async (id) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.delete(`${url}/posts/${id}`, { headers });
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

/* ==================  Update Post  ================== */
export const updatePost = async (id, values) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.put(`${url}/posts/${id}`, values, { headers });
        console.log(data);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

/* ================== Add Comment ================== */
export const addComment = async (values) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.post(`${url}/comments`, values, { headers });
        console.log('Comment added successfully:', data);
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

/* ==================  Update Comment  ================== */
export const updateComment = async (id, values) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.put(`${url}/comments/${id}`, values, { headers });
        console.log(data);
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};


/* ================== Delete Comment ================== */
export const deleteComment = async (id) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.delete(`${url}/comments/${id}`, { headers });
        console.log(data)
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

/* ================== Profile Photo Upload ================== */
export const profilePhotoUpload = async (formData) => {
    try {
        const headers = getHeaders();
        const response = await axios.post(`${url}/users/profile/upload`, formData, { headers });
        console.log('Profile photo uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        throw error;
    }
};

/* ================== Get User ================== */
export const getUser = async (userId) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.get(`${url}/users/${userId}`, { headers });
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

/* ================== Get Posts Profile ================== */
export const getPostsProfile = async (userId) => {
    try {
        const headers = getHeaders();
        const { data } = await axios.get(`${url}/users/${userId}/posts`, { headers });
        const filteredData = data.user.posts.filter(post => post.userId === userId && post.deletedAt === null);
        return filteredData;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return null;
    }
};
