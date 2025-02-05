import customFetch from "../utils/customFetch";

export const allMealsQuery = (params) => {
    const { meal, cuisine, sort_by, dietary, page } = params;
    return {
        queryKey: [
            "meals",
            meal ?? "all",
            cuisine ?? "all",
            sort_by ?? "newest",
            dietary ?? "all",
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