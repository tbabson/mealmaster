import customFetch from "../utils/customFetch";

export const allMealsQuery = (params) => {
    const { name, country, mealType, sort, dietary, page } = params;
    return {
        queryKey: [
            "meals",
            name ?? "",
            country ?? "",
            mealType ?? "all",
            dietary ?? "all",
            sort ?? "newest",
            page ?? 1,
        ],
        queryFn: async () => {
            const { data } = await customFetch.get("/meals", {
                params,
            });
            return data;
        },
    };
};


export const loader =
    (queryClient) =>
        async ({ request }) => {
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);
            await queryClient.ensureQueryData(allMealsQuery(params));
            return { searchValues: { ...params } };
        };

