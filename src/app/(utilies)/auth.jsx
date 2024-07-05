import axios from 'axios';


// const url = 'http://localhost:8000'
const url = 'https://facebook-node-9sqd.onrender.com'

export const register = async (value) => {
    try {
        const response = await axios.post(`${url}/auth/signup`, value);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (value) => {
    try {
        const response = await axios.post(`${url}/auth/signin`, value);
        return response.data;
    } catch (error) {
        throw error;
    }
};
