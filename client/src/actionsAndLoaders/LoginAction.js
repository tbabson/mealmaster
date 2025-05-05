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
        const response = await customFetch.post("/auth/login", data);
        console.log("Login response:", response.data);

        // Invalidate queries to refresh data
        queryClient.invalidateQueries();

        // Check if we need to verify admin role
        if (role === "admin") {
            // Since the login response doesn't include user role info,
            // we need to make another request to check the role
            try {
                const userResponse = await customFetch.get("/users/current-user");
                console.log("User data response:", userResponse.data);

                const userData = userResponse.data.user;

                if (!userData || userData.role !== "admin") {
                    errors.msg = "This account doesn't have admin privileges";
                    // Logout since they don't have admin access
                    return redirect("/");
                }

                toast.success("Admin login successful");
                return redirect("/admin/meals");
            } catch (error) {
                console.log("Role verification error:", error);
                errors.msg = "Could not verify admin privileges";
                return errors;
            }
        } else {
            // For regular users, we don't need to check role
            toast.success("Login successful");
            return redirect("/");
        }
    } catch (error) {
        console.log("Login error:", error);

        // More robust error handling
        let errorMessage = "Login failed";

        if (error.response) {
            errorMessage = error.response.data?.msg || "Server error: " + error.response.status;
            console.log("Response error data:", error.response.data);
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