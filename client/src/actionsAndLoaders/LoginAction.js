import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Extract role and return path
    const role = data.role || "user";
    const returnPath = data.returnPath || "/";

    // Remove these fields from the data sent to the API
    delete data.role;
    delete data.returnPath;

    // Validation
    const errors = { msg: "" };
    if (data.password.length < 8) {
        errors.msg = "Password must be at least 8 characters long";
        return errors;
    }

    try {
        // First attempt to login
        const response = await customFetch.post("/auth/login", data);

        // Invalidate queries to refresh data
        queryClient.invalidateQueries();

        // Check if we need to verify admin role
        if (role === "admin") {
            try {
                // Verify if the user has admin privileges
                const userResponse = await customFetch.get("/users/current-user");
                const userData = userResponse.data.user;

                if (!userData || userData.role !== "admin") {
                    // If not admin, logout and return error
                    await customFetch.get("/auth/logout");
                    errors.msg = "This account doesn't have admin privileges";
                    return errors;
                }

                // Admin login successful
                toast.success("Admin login successful");
                return redirect("/admin/dashboard");
            } catch (error) {
                errors.msg = "Could not verify admin privileges";
                return errors;
            }
        } else {
            // Regular user login successful
            toast.success("Login successful");
            return redirect(returnPath);
        }
    } catch (error) {
        // More robust error handling
        let errorMessage = "Login failed";
        if (error.response) {
            errorMessage = error.response.data?.msg || "Server error: " + error.response.status;
        } else if (error.request) {
            errorMessage = "No response from server. Please check your connection.";
        } else {
            errorMessage = error.message || "An unexpected error occurred";
        }
        toast.error(errorMessage);
        errors.msg = errorMessage;
        return errors;
    }
};