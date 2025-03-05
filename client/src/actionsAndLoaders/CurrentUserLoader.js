import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../Features/user/userSlice";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";

const userQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const { data } = await customFetch.get("/users/currentuser");
        return data.user;
    },
};

export const loader = (queryClient) => async () => {
    try {
        return await queryClient.ensureQueryData(userQuery);
    } catch (error) {
        toast.error(error?.response?.data?.msg || "User not logged in");
        return redirect("/");
    }
};

export const useCurrentUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user, loading } = useSelector((state) => state.user);

    const { data, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await customFetch.get("/users/currentuser");
            return data.user;
        },
        onSuccess: (userData) => {
            dispatch(fetchCurrentUser.fulfilled(userData)); // ✅ Update Redux state
        },
        onError: (error) => {
            toast.error(error?.response?.data?.msg || "User not logged in");
            navigate("/"); // Redirect if user fetch fails
        },
    });

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser()); // ✅ Dispatch only if Redux state is empty
        }
    }, [dispatch, user]);

    return { user, loading };
};



