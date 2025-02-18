import customFetch from "../utils/customFetch";


export const loader = async ({ params }) => {
    const { data } = await customFetch.get(`/meals/${params.id}`);
    return { meal: data };
};