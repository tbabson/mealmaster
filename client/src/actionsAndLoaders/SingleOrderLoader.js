// OrderLoader.js
import customFetch from "../utils/customFetch";

// Function to fetch a single order by ID
export const singleOrderQuery = async (orderId) => {
    if (!orderId) {
        console.log("No orderId provided to query function");
        return { order: null };
    }
    try {
        const { data } = await customFetch.get(`/orders/${orderId}`);
        return { order: data.order };
    } catch (error) {
        console.error("Error in singleOrderQuery:", error);
        return { order: null };
    }
};

// Loader function for React Router that uses React Query
export const loader = (queryClient) => async ({ params }) => {
    const { orderId } = params; // Make sure your route defines :orderId
    if (!orderId) {
        return { order: null };
    }
    try {
        const data = await queryClient.ensureQueryData({
            queryKey: ["singleOrder", orderId],
            queryFn: () => singleOrderQuery(orderId),
        });
        return data; // data: { order: { ... } }
    } catch (error) {
        console.error("Error fetching single order:", error);
        return { order: null };
    }
};
