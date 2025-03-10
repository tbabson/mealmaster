// // CurrentUserLoader.js - Improved error handling and synchronization
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser, setUser } from "../Features/user/userSlice";
// import customFetch from "../utils/customFetch";
// import { toast } from "react-toastify";
// import { useNavigate, redirect } from "react-router-dom";
// import { useEffect } from "react";

// // The user query configuration for React Query
// const userQuery = {
//     queryKey: ["user"],
//     queryFn: async () => {
//         try {
//             const { data } = await customFetch.get("/users/currentuser");
//             return data.user;
//         } catch (error) {
//             console.error("Failed to fetch current user:", error.response?.data || error.message);
//             throw error;
//         }
//     },
//     retry: false, // Don't retry on 401
//     staleTime: 5 * 60 * 1000, // 5 minutes
// };

// // Loader for routes that require authentication
// export const loader = (queryClient) => async () => {
//     try {
//         const userData = await queryClient.ensureQueryData(userQuery);
//         return userData;
//     } catch (error) {
//         console.error("Loader error:", error.response?.data || error.message);
//         if (error.response?.status === 401) {
//             toast.error("Please log in to access this page");
//             return redirect("/login");
//         }
//         return redirect("/");
//     }
// };

// // Hook for components that need the current user
// export const useCurrentUser = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user, loading: reduxLoading } = useSelector((state) => state.user);

//     const {
//         data: queryUser,
//         isLoading: queryLoading,
//         error
//     } = useQuery({
//         ...userQuery,
//         enabled: true, // Always enabled for authenticated routes
//         onSuccess: (userData) => {
//             if (userData && (!user || JSON.stringify(userData) !== JSON.stringify(user))) {
//                 dispatch(setUser(userData)); // Update Redux with React Query data
//             }
//         },
//         onError: (error) => {
//             if (error.response?.status === 401) {
//                 dispatch(setUser(null)); // Clear invalid user data
//                 // Only navigate if not already on login page
//                 if (!window.location.pathname.includes('/login')) {
//                     toast.error("Authentication expired. Please log in again.");
//                     navigate("/login");
//                 }
//             }
//         },
//     });

//     // Reconcile data from Redux and React Query
//     useEffect(() => {
//         // If we have query data but Redux is empty or different, update Redux
//         if (queryUser && (!user || JSON.stringify(queryUser) !== JSON.stringify(user))) {
//             dispatch(setUser(queryUser));
//         }
//         // If Redux has user data but query failed with 401, clear Redux
//         else if (user && error?.response?.status === 401) {
//             dispatch(setUser(null));
//         }
//     }, [queryUser, user, error, dispatch]);

//     return {
//         user: user || queryUser,
//         loading: reduxLoading || queryLoading
//     };
// };