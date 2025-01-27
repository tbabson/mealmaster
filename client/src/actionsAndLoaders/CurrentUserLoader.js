import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/users/currentuser");
        //console.log("Loader response:", data); // Debug
        return { user: data.user }; // Return the user object
    } catch (error) {
        toast.error(error?.response?.data?.msg || "Failed to fetch user data");
        return { user: null }; // Handle errors gracefully
    }
};
