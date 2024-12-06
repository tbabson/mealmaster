import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/auth/register", data);
        toast.success("Registration successful");
        return redirect("/login");
    } catch (error) {
        toast.error(error?.response?.data.msg);
        return error;
    }
};