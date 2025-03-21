import axios from "axios";
import { toast } from "react-toastify";

const customFetch = axios.create({
    baseURL: "/api/v1",
    withCredentials: true, // Ensures cookies (if any) are sent with requests
});

// Helper function to get token from localStorage safely
const getAuthToken = () => {
    try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            return user?.token || null;
        }
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Remove corrupted data
    }
    return null;
};

// Request interceptor to attach Authorization header
customFetch.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.warn("Unauthorized: Clearing user data...");
                localStorage.removeItem("user");

                // Show a message but do not redirect
                // toast.error("Please log in if needed.");
            } else if (status >= 500) {
                toast.error("Server error. Please reload the page.");
            }
        }
        return Promise.reject(error);
    }
);

export default customFetch;