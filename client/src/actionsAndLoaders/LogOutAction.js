import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

export const action = async () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    try {
        await customFetch.get("/auth/logout");
        toast.success("Logout successful");
        return navigate("/"); // Redirect to the "/meals" route after logout
    } catch (error) {
        const errorMessage =
            "Something went wrong. Please try again." || error?.response?.data?.msg;
        toast.error(errorMessage); // Display error message
        return null; // Return `null` to indicate no redirection
    }
};
