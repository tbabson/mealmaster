import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const customFetch = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
})

// // Add token to headers for authentication
// customFetch.interceptors.request.use((req) => {
//     const token = localStorage.getItem('token'); // Retrieve token from local storage
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });


export default customFetch