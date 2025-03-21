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
        return { orders: [] };
    }
};

// Loader function for React Router that uses React Query
export const loader = (queryClient, store) => async () => {
    if (!store) {
        return { orders: [] };
    }

    try {
        // Get current user from Redux store
        const state = store.getState(); // Ensure we access Redux directly
        const user = state?.user?.user;
        const userId = user?._id;

        if (!userId) {
            return { orders: [] };
        }

        // Fetch orders using React Query
        const data = await queryClient.ensureQueryData({
            queryKey: ["userOrders", userId],
            queryFn: () => userOrdersQuery(userId),
        });
        return data; // Return the fetched data
    } catch (error) {
        return { orders: [] };
    }
};
