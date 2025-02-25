import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";


export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: "" };
    if (data.password.length < 8) {
        errors.msg = "Password must be at least 6 characters long";
        return errors;
    }
    try {
        await customFetch.post("/auth/login", data);
        queryClient.invalidateQueries()
        toast.success("Login successful");
        return redirect("/");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};