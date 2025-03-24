// OrderLoader.js
import customFetch from "../utils/customFetch";

// Function to fetch orders for a specific user
export const userOrdersQuery = async (userId) => {
    if (!userId) {
        console.log("No user ID provided to query function");
        return { orders: [] };
    }
    try {
        const { data } = await customFetch.get(`/orders/user/${userId}`);
        return { orders: Array.isArray(data) ? data : data.orders || [] };
    } catch (error) {
        console.error("Error in userOrdersQuery:", error);
        return { orders: [] };
    }
};

// Loader function that gets userId from Redux store
export const loader = (queryClient, store) => async () => {
    if (!store) {
        return { orders: [] };
    }
    try {
        // Get current user from Redux store
        const state = store.getState();
        const user = state?.user?.user;
        const userId = user?._id;
        if (!userId) {
            return { orders: [] };
        }
        const data = await queryClient.ensureQueryData({
            queryKey: ["userOrders", userId],
            queryFn: () => userOrdersQuery(userId),
        });
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { orders: [] };
    }
};
