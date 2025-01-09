import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/meals");
        return { meals: data };
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};