import customFetch from "../utils/customFetch";

const singleMealQuery = async (id) => {
    const { data } = await customFetch.get(`/meals/${id}`);
    return { meal: data };
};

export const loader = (queryClient) => async ({ params }) => {
    try {
        const response = await queryClient.ensureQueryData({
            queryKey: ["singleMeal", params.id],
            queryFn: () => singleMealQuery(params.id),
        });

        return { meal: response.meal };
    } catch (error) {
        console.error("Error fetching meal:", error);
        throw new Response("Meal not found", { status: 404 });
    }
};
